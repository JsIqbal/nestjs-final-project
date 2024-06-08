import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }

    findOne(id: number) {
        if (!id) return null;

        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attars: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException("User Not Found!"); // Not gonna work with gRPC/websockets
        }

        Object.assign(user, attars);

        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException("User Not Found!");
        }

        return this.repo.remove(user);
    }
}
