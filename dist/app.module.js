"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const reports_service_1 = require("./reports/reports.service");
const reports_controller_1 = require("./reports/reports.controller");
const reports_module_1 = require("./reports/reports.module");
const user_entity_1 = require("./users/user.entity");
const report_entity_1 = require("./reports/report.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [user_entity_1.User, report_entity_1.Report],
                synchronize: true
            }),
            users_module_1.UsersModule, reports_module_1.ReportsModule
        ],
        controllers: [app_controller_1.AppController, reports_controller_1.ReportsController],
        providers: [app_service_1.AppService, reports_service_1.ReportsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map