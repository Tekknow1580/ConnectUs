import{ Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { UserRepository } from "../domain/repository/UserRepository";

@Service()
export class UserService {

    private userRepository: UserRepository;

    constructor() { 
        this.userRepository = Container.get(UserRepository);
    }

    count (){
        return this.userRepository.count();
    }
}