import { Body, Delete, Get, JsonController, Param, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { Authmiddelware } from "../middelware/Authmiddelware";
import { Login } from "../models/LoginModel";
import { UserService } from "../service/UserService";

@JsonController("/User")
@Service()
export class UserController {

    private userService: UserService;

    constructor(){
        this.userService = Container.get(UserService);
    }

    @Get("")
    public hello() {
        return "Hello World";
    }

    @Post("/New")
    public NewUser(@Body() user: Login){
        return this.userService.save(user);
    }

    @Delete("/Del/:ID")
    public DelUser(@Param("ID")ID:number){
        return this.userService.DelUser(ID);
    }

    @UseBefore(Authmiddelware)
    @Get("/AllUsers")
    public AllUsers(){
        return this.userService.AllUsers();
    }

    @Get("/world")
    public world() {
        this.userService.count();
        return this.userService.count();
    }
}