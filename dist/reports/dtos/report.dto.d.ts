import { User } from "../../users/user.entity";
export declare class ReportDto {
    id: number;
    price: number;
    make: string;
    model: string;
    year: number;
    lat: number;
    lng: number;
    miles: number;
    approved: number;
    userID: User;
}
