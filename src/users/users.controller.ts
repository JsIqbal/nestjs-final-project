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
    Session,
    UseGuards,
} from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user-dto";

import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";

import { Serialize } from "src/interceptors/serialize.interceptor";

import { currentUser } from "src/decorators/current-user.decorator";

import { User } from "./user.entity";

import { AuthGuard } from "./guards/auth.guard";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Get("/whoami")
    @UseGuards(AuthGuard)
    whoAmI(@currentUser() user: User) {
        return user;
    }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);

        session.userId = user.id;

        return user;
    }

    @Post("/signin")
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);

        session.userId = user.id;

        return user;
    }

    @Post("/logout")
    async logout(@Session() session: any) {
        session.userId = null;
    }

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
