import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { currentUser } from "src/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @currentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
