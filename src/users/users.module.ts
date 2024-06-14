import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";

import { UsersController } from "./users.controller";

import { User } from "./user.entity";

import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, AuthService],
    controllers: [UsersController],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes("*");
    }
}
