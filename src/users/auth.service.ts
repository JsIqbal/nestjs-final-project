import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signup(email: string, password: string) {
        // See if the user already exists:
        const users = await this.userService.find(email);
        if (users.length > 0) throw new BadRequestException("Email in use!");

        //generate a salt
        const salt = randomBytes(8).toString("hex");

        // hash the password
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // hash the salt and the password together
        const result = salt + "." + hash.toString("hex");

        // create a new user and save it
        const user = await this.userService.create(email, result);

        // return the user
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) throw new NotFoundException("User Not Found!");

        const [salt, storedHash] = user.password.split(".");

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString("hex"))
            throw new BadRequestException("Password mismatch!");

        return user;
    }
}
