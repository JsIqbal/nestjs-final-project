import { NotFoundException } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    update(id: string, approved: boolean): Promise<NotFoundException | Report>;
    createEstimate({ make, model, lng, lat, year, miles }: GetEstimateDto): Promise<any>;
}
