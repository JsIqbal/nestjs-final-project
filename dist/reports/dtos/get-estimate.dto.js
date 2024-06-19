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
exports.GetEstimateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetEstimateDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "make", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1985),
    (0, class_validator_1.Max)(2050),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.year)),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsLatitude)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseFloat(obj.lat)),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsLongitude)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseFloat(obj.lng)),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2000000),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.miles)),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "miles", void 0);
exports.GetEstimateDto = GetEstimateDto;
//# sourceMappingURL=get-estimate.dto.js.map