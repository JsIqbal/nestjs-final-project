import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AuthService } from "./auth.service";
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto): Promise<import("./user.entity").User>;
    signin(body: CreateUserDto): Promise<import("./user.entity").User>;
    getUser(id: string): Promise<import("./user.entity").User>;
    getAllUsers(email: string): Promise<import("./user.entity").User[]>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
    deleteUser(id: string): Promise<import("./user.entity").User>;
}
