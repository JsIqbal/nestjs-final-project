import {
    IsLatitude,
    IsLongitude,
    IsNumber,
    IsString,
    Max,
    Min,
} from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @Min(5000)
    @Max(2000000)
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1985)
    @Max(2050)
    year: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(2000000)
    miles: number;
}
