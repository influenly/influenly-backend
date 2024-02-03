import { User } from 'src/entities';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { ICreateUserInput, IUpdateUserInput } from './interfaces';
export declare class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource);
    createAndSave(createUserInput: ICreateUserInput, queryRunner?: QueryRunner): Promise<User>;
    findAllCreators(filter?: any, queryRunner?: QueryRunner): Promise<User[]>;
    findById(id: number, queryRunner?: QueryRunner): Promise<User>;
    findByEmail(email: string, queryRunner?: QueryRunner): Promise<User>;
    updateById(id: number, updateUserInput: IUpdateUserInput, queryRunner?: QueryRunner): Promise<User>;
}
