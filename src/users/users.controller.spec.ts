import { Test, TestingModule } from "@nestjs/testing";

import { UsersController } from "./users.controller";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

import { User } from "./user.entity";
import { NotFoundException } from "@nestjs/common";

describe("UsersController", () => {
    let controller: UsersController;

    let fakeAuthService: Partial<AuthService>;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        fakeAuthService = {
            signup: (email: string, password: string) =>
                Promise.resolve({ id: 1, email, password: "asdf" } as User),
            signin: (email: string, password: string) =>
                Promise.resolve({
                    id: 1,
                    email: "k@k.com",
                    password: "123456",
                } as User),
        };

        fakeUsersService = {
            findOne: (id: number) =>
                Promise.resolve({
                    id,
                    email: "asdf@email.com",
                    password: "asdf",
                } as User),
            find: (email: string) =>
                Promise.resolve([{ id: 1, email, password: "asdf" } as User]),
            // remove: () => {}
            // update: () => {}
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
            controllers: [UsersController],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it("Users controller should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("getAllUsers return a list of users: ", async () => {
        const users = await controller.getAllUsers("asdf@email.com");

        expect(users.length > 0);
        expect(users[0].email).toEqual("asdf@email.com");
    });

    it("getUser return a user: ", async () => {
        const user = await controller.getUser("1");

        expect(user.email).toEqual("asdf@email.com");
    });

    it("getUser throw an error if user is not found: ", async () => {
        fakeUsersService.findOne = () => Promise.resolve(null);

        try {
            await controller.getUser("15");
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
        }
    });

    it("signin updates session object and returns user", async () => {
        const session = { userId: -10 };
        const user = await controller.signin(
            { email: "asdf@asdf.com", password: "asdf" },
            session
        );

        expect(user.id).toEqual(1);
        expect(session.userId).toEqual(1);
    });

    it("signup returns the registered user", async () => {
        const session = { userId: -10 };
        const user = await controller.signup(
            { email: "asdf@asdf.com", password: "asdf" },
            { session }
        );

        expect(user.email).toEqual("asdf@asdf.com");
    });
});
