import { Test } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    (user) => user.email === email
                );
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 999999),
                    email,
                    password,
                } as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
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
            fakeUsersService.find = () =>
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
        fakeUsersService.find = () =>
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
        await service.signup("asdf@asdf.com", "asdf");

        const user = await service.signin("asdf@asdf.com", "asdf");
        expect(user).toBeDefined();
    });
});
