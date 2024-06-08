import { Test } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => {
                return Promise.resolve({ id: 1, email, password } as User);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it("can create an instance of Auth service", async () => {
        expect(service).toBeDefined();
    });

    it("creates a user with a salted and hashed pass", async () => {
        const user = await service.signup("js@iq.com", "1234asdf");

        expect(user.password).not.toEqual("1234asdf");

        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it("throws an error if user signs up with email that is in use", async () => {
        try {
            fakeUserService.find = () =>
                Promise.resolve([
                    {
                        id: 1,
                        email: "kraken@k.com",
                        password: "1234asdf",
                    } as User,
                ]);

            await service.signup("asdf@asdf.com", "asdf");
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toContain("Email in use!");
        }
    });

    it("throws if signin is called with an unused email", async () => {
        try {
            await service.signin("asdflkj@asdlfkj.com", "passdflkj");
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toContain("User Not Found!");
        }
    });

    it("throws if an invalid password is provided", async () => {
        fakeUserService.find = () =>
            Promise.resolve([
                { email: "asdf@asdf.com", password: "laskdjf" } as User,
            ]);
        try {
            await service.signin("laskdjf@alskdfj.com", "passowrd");
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
        }
    });

    it("Returns a user if password is correct", async () => {
        fakeUserService.find = () =>
            Promise.resolve([
                {
                    email: "asdf@asdf.com",
                    password:
                        "27348c8413b34905.4beff003437b02fc4b88302d195d77f7b2b5663f3c6fad1773005f208dc65816",
                } as User,
            ]);

        const user = await service.signin("asdf@asdf.com", "asdf");
        expect(user).toBeDefined();
    });
});
