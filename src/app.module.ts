import {
    MiddlewareConsumer,
    Module,
    NestModule,
    ValidationPipe,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
const cookieSession = require("cookie-session");

import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";

import { ReportsService } from "./reports/reports.service";
import { AppService } from "./app.service";

import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

import { ReportsController } from "./reports/reports.controller";
import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: "sqlite",
                    database: config.get<string>("DB_NAME"),
                    entities: [User, Report],
                    synchronize: true,
                };
            },
        }),
        UsersModule,
        ReportsModule,
    ],
    controllers: [AppController, ReportsController],
    providers: [
        AppService,
        ReportsService,
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
