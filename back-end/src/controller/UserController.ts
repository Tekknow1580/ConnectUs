import { Body, Delete, Get, JsonController, Param, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { Authmiddelware } from "../middelware/Authmiddelware";
import { Login } from "../models/LoginModel";
import { TokenService } from "../service/TokenService";
import { UserService } from "../service/UserService";

@JsonController("/User")
@Service()
export class UserController {

    private UserSer: UserService;
    private TKSer: TokenService;

    constructor() {
        this.UserSer = Container.get(UserService);
        this.TKSer = Container.get(TokenService);
    }

    @Get("")
    public hello() {
        return "Hello World";
    }

    @Post("/New")
    public async NewUser(@Body() user: Login) {
        var NewUser = await this.UserSer.save(user);
        if (NewUser == false)
            return { res: false }
        return {
            res: true, TK: {
                TK: this.TKSer.Gen(NewUser),
                User: user.UserName
            }
        }
    }

    @UseBefore(Authmiddelware)
    @Get("Delaits/:Name")
    public GetUser(@Param("Name") Name: string) {
        return this.UserSer.FindByUserName(Name);
    }

    @UseBefore(Authmiddelware)
    @Delete("/Del/:ID")
    public DelUser(@Param("ID") ID: number) {
        return this.UserSer.DelUser(ID);
    }

    @UseBefore(Authmiddelware)
    @Get("/AllUsers")
    public AllUsers() {
        return this.UserSer.AllUsers();
    }
}