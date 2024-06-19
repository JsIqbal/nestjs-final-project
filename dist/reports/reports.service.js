"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const report_entity_1 = require("./report.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
let ReportsService = class ReportsService {
    constructor(repo) {
        this.repo = repo;
    }
    create(reportDto, user) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }
    async update(id, approved) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        if (!report)
            return new common_1.NotFoundException("Report Not Found!");
        report.approved = approved;
        return this.repo.save(report);
    }
    createEstimate({ make, model, lng, lat, year, miles }) {
        return this.repo
            .createQueryBuilder()
            .select("AVG(price)", "price")
            .where("make = :make", { make })
            .andWhere("model = :model", { model })
            .andWhere("lng - :lng BETWEEN -5 AND 5", { lng })
            .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
            .andWhere("year - :year BETWEEN -3 AND 3", { year })
            .orderBy("ABS(miles - :miles)", "DESC")
            .andWhere("approved IS TRUE")
            .setParameters({ miles })
            .limit(3)
            .getRawOne();
    }
};
ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map