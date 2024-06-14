import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { AuthGuard } from "../guards/auth.guard";
import { currentUser } from "../decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { ReportsService } from "./reports.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { ReportDto } from "./dtos/report.dto";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { AdminGuard } from "src/guards/admin.guard";

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
}
