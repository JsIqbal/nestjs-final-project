import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user-dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@Serialize(UserDto) // Applying interceptor for all routes
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }

    @Post("/signin")
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }

    // @Serialize(UserDto) // Applying interceptor for specific controller
    @Get("/:id")
    async getUser(@Param("id") id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException("User Not Found!");
        }

        return user;
    }

    @Get()
    getAllUsers(@Query("email") email: string) {
        console.log("The handler is running!");
        return this.userService.find(email);
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
        console.log(body);
        return this.userService.update(parseInt(id), body);
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: string) {
        return this.userService.remove(parseInt(id));
    }
}
