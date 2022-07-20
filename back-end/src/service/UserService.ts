import { Service } from "typedi";
import { Container, InjectRepository } from "typeorm-typedi-extensions";
import User from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { Login } from "../models/LoginModel";
import { PasswordService } from "./PasswordService";

@Service()
export class UserService {

    constructor(@InjectRepository() private userRepository: UserRepository, private passwordService: PasswordService) {
        this.passwordService = Container.get(PasswordService);
    }

    count() {
        return this.userRepository.count();
    }

    async save(user: Login) {
        user.Password = await this.passwordService.Encode(user.Password);
        var NewUser = new User(user.UserName, user.Password);
        return this.userRepository.save(NewUser);
    }

    DelUser(ID: number) {
        return this.userRepository.delete(ID);
    }

    AllUsers() {
        return this.userRepository.find({});
    }

    FindByUserName(UName: string) {
        return this.userRepository.findOne({ where: { UserName: UName } })
    }
}