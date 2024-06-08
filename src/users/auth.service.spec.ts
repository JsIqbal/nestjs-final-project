import { Test } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

import { User } from "./user.entity";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const fakeRepository: Partial<UsersService> = {
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
                    useValue: fakeRepository,
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
});
