import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";
import { Container, InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../../domain/repository/UserRepository";
import { UserService } from "../../service/UserService";
import { Dummy } from "../Dummy";

@JsonController("/api/users")
@Service()
export class UserController {

    private dummy: Dummy;
    private userService: UserService;

    constructor(){
        this.dummy = Container.get(Dummy);
        this.userService = Container.get(UserService);
    }

    @Get("")
    public hello() {
        return "Hello World";
    }


    @Get("/world")
    public world() {
        this.userService.count();
        return this.dummy.hello();
    }
}