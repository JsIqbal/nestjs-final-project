import { User } from "../users/user.entity";
export declare class Report {
    id: number;
    price: number;
    make: string;
    model: string;
    year: number;
    lat: number;
    lng: number;
    miles: number;
    user: User;
    approved: boolean;
}
