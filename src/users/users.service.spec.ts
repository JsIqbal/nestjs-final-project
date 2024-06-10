import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("UsersService", () => {
    let service: UsersService;

    beforeEach(async () => {
        const mockRepository = {
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn(),
            remove: jest.fn(),
            // Add other necessary methods with appropriate mocks
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User), // Use the correct token for the repository
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
