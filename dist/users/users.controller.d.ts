import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(body: CreateUserDto): void;
    getUser(id: string): Promise<import("./user.entity").User>;
    getAllUsers(email: string): Promise<import("./user.entity").User[]>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
    deleteUser(id: string): Promise<import("./user.entity").User>;
}
