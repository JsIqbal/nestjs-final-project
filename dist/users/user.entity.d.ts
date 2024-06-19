import { Report } from "../reports/report.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    reports: Report[];
    logInsert(): void;
    logRemove(): void;
    logUpdate(): void;
}
