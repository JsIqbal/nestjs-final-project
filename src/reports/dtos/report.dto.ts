import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    miles: number;

    @Expose()
    approved: number;

    @Expose()
    @Transform(({ obj }) => {
        console.log("Transformed exposure in ReportDTO: \n", obj);
        return obj.user.id;
    })
    userID: User;
}
