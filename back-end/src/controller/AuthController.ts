import { Body, JsonController, Post } from "routing-controllers";
import Container from "typedi";
import { Login } from "../models/LoginModel";
import { PasswordService } from "../service/PasswordService";
import { TokenService } from "../service/TokenService";
import { UserService } from "../service/UserService";

@JsonController("/Auth")
export class AuthController {


    constructor(private passwordService: PasswordService, private userservice: UserService, private tokenservice: TokenService) {
        this.passwordService = Container.get(PasswordService);
        this.userservice = Container.get(UserService);
        this.tokenservice = Container.get(TokenService);
    }

    @Post("/Login")
    async login(@Body() user: Login) {
        var SavedUser = await this.userservice.FindByUserName(user.UserName);
        if (SavedUser != undefined && await this.passwordService.Validate(user.Password, SavedUser.Password))
            return this.tokenservice.Gen(SavedUser);
        return false;
    }
}