import { Service } from "typedi";
import { Container, InjectRepository } from "typeorm-typedi-extensions";
import User from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { PasswordService } from "./PasswordService";

@Service()
export class UserService {

    constructor(@InjectRepository() private userRepository: UserRepository, private passwordService: PasswordService) {
        this.passwordService = Container.get(PasswordService);
    }

    count() {
        return this.userRepository.count();
    }

    async save(NewUser: User) {
        NewUser.Password = await this.passwordService.Encode(NewUser.Password);
        try {
            this.userRepository.save(NewUser);
        } catch { return false }
        return NewUser;
    }

    DelUser(ID: string) {
        return this.userRepository.delete(ID);
    }

    AllUsers() {
        return this.userRepository.find({});
    }

    FindEmail(Email: string) {
        return this.userRepository.findOne({ where: { Email: Email } })
    }
}