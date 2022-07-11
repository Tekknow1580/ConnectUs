import { Get, JsonController } from "routing-controllers";
import { UserRepository } from "src/domain/repository/UserRepository";
import { Service } from "typedi";
import { Container, InjectRepository } from "typeorm-typedi-extensions";

@JsonController("/api/users")
@Service()
export class UserController {

    private userRepository: UserRepository;

    constructor(){
        this.userRepository = Container.get(UserRepository);
    }

    @Get("")
    public hello() {
        return "Hello World";
    }


    @Get("/world")
    public world() {
        return this.userRepository.count();
    }
}