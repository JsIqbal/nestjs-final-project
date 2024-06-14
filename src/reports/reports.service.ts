import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);

        report.user = user;

        return this.repo.save(report);
    }

    async update(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });

        if (!report) return new NotFoundException("Report Not Found!");

        report.approved = approved;

        return this.repo.save(report);
    }

    createEstimate({ make, model, lng, lat, year, miles }: GetEstimateDto) {
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
}
