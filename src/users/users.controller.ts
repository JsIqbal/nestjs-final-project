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

    @Get('/whoami')
    whoAmI(@Session() session: any) {
        const user = this.userService.findOne(session.userId);
        
        if (!user) throw new NotFoundException("User Is Logged Out!");

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

    @Post('/logout')
    async logout(@Session() session: any) {
        session.userId = null;
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
