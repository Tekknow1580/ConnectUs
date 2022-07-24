import { Delete, Get, JsonController, Param, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { Authmiddelware } from "../middelware/Authmiddelware";
import { UserService } from "../service/UserService";

@JsonController("/User")
@UseBefore(Authmiddelware)
@Service()
export class UserController {

    private UserSer: UserService;

    constructor() {
        this.UserSer = Container.get(UserService);
    }

    @Get("")
    public hello() {
        return "Hello World";
    }

    @Get("/Delaits/:Email")
    public async GetUser(@Param("Email") Email: string) {
        return await this.UserSer.FindEmail(Email);
    }

    @Delete("/Del/:ID")
    public DelUser(@Param("ID") ID: string) {
        return this.UserSer.DelUser(ID);
    }

    @Get("/AllUsers")
    public AllUsers() {
        return this.UserSer.AllUsers();
    }
}