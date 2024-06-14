import { Exclude } from "class-transformer";
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Report } from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log("Inserted record with id: ", this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("Removed Entity with id: ", this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated user with id: ", this.id);
    }
}
