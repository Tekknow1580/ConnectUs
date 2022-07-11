import { Service } from "typedi";
import { EntityRepository } from "typeorm";
import { Repository } from "typeorm";
import User from "../entities/User";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
}