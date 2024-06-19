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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportDto = void 0;
const class_validator_1 = require("class-validator");
class CreateReportDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(5000),
    (0, class_validator_1.Max)(2000000),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "make", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1985),
    (0, class_validator_1.Max)(2050),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2000000),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "miles", void 0);
exports.CreateReportDto = CreateReportDto;
//# sourceMappingURL=create-report.dto.js.map