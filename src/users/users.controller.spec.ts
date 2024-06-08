import { Test, TestingModule } from "@nestjs/testing";

import { UsersController } from "./users.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

describe("UsersController", () => {
    let controller: UsersController;

    let fakeAuthService: AuthService;
    let fakeUsersService: UsersService;

    beforeEach(async () => {
        fakeAuthService = {
            signup: () => {},
            signin: () => {},
        };

        fakeUsersService = {
            findOne: () => {},
            find: () => {}
            remove: () => {}
            update: () => {}
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
