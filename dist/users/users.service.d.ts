import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findOne(id: number): Promise<User>;
    find(email: string): Promise<User[]>;
    update(id: number, attars: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
