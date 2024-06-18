import {
    MiddlewareConsumer,
    Module,
    NestModule,
    ValidationPipe,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";

const cookieSession = require("cookie-session");

import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";

import { AppService } from "./app.service";

import { AppController } from "./app.controller";

import dbConfig from "./config/typeorm.config";
// const dbConfig = require("./config/typeorm.config.js")

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot(dbConfig),
        UsersModule,
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true, // Security feature to filter out everything from request except expectations
            }),
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    name: "session",
                    keys: [
                        /* secret keys */
                        "sdfgmnsrdio",
                    ],
                })
            )
            .forRoutes("*");
    }
}
