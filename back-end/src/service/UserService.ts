import{ Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../domain/repository/UserRepository";

@Service()
export class UserService {

    constructor(@InjectRepository() private userRepository: UserRepository) {}

    count (){
        return this.userRepository.count();
    }
}