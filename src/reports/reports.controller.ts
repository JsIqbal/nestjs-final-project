import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";

import { ReportsService } from "./reports.service";

import { currentUser } from "../decorators/current-user.decorator";

import { Serialize } from "../interceptors/serialize.interceptor";

import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

import { CreateReportDto } from "./dtos/create-report.dto";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { ReportDto } from "./dtos/report.dto";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

import { User } from "../users/user.entity";

@Controller("reports")
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @currentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    approveReport(@Param("id") id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.update(id, body.approved);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }
}
