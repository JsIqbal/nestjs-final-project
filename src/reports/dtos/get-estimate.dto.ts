import { Transform } from "class-transformer";
import {
    IsLatitude,
    IsLongitude,
    IsNumber,
    IsString,
    Max,
    Min,
} from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1985)
    @Max(2050)
    @Transform(({ obj }) => parseInt(obj.year))
    year: number;

    @IsLatitude()
    @Transform(({ obj }) => parseFloat(obj.lat))
    lat: number;

    @IsLongitude()
    @Transform(({ obj }) => parseFloat(obj.lng))
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(2000000)
    @Transform(({ obj }) => parseInt(obj.miles))
    miles: number;
}
