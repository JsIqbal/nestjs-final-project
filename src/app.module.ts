import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

import { ReportsService } from './reports/reports.service';
import { AppService } from './app.service';

import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

import { ReportsController } from './reports/reports.controller';
import { AppController } from './app.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true // Used in development environment
        }),
        UsersModule, ReportsModule
    ],
    controllers: [AppController, ReportsController],
    providers: [AppService, ReportsService],
})
export class AppModule {}
