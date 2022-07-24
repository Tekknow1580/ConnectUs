import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import Container, { Token } from "typedi";
import User from "../domain/entities/User";
import { SortUser } from "../models/UserModel";
import { PasswordService } from "../service/PasswordService";
import { TokenService } from "../service/TokenService";
import { UserService } from "../service/UserService";

@JsonController("/Auth")
export class AuthController {

    private PassSer: PasswordService;
    private UserSer: UserService;
    private TKSer: TokenService;

    constructor() {
        this.PassSer = Container.get(PasswordService);
        this.UserSer = Container.get(UserService);
        this.TKSer = Container.get(TokenService);
    }

    @Get("/:Token")
    public async Validate(@Param("Token") Token: string) {
        var U = this.TKSer.Valadate(Token);
        if (U === false)
            return { res: false }
        return { res: true }
    }

    @Post("/Login")
    public async login(@Body() user: SortUser) {
        var SavedUser = await this.UserSer.FindEmail(user.Email);
        if (SavedUser != undefined && await this.PassSer.Validate(user.Password, SavedUser.Password))
            return {
                res: true, TK: {
                    TK: this.TKSer.Gen(SavedUser),
                    User: SavedUser.Email
                }
            }
        return { res: false };
    }

    @Post("/SignUp")
    public async NewUser(@Body() user: User) {
        var Exist = await this.UserSer.FindEmail(user.Email);
        var NewUser = await this.UserSer.save(user);
        if (Exist === undefined) return {res: false, Val: "US5 'User Exists'"}
        if ( NewUser === false) return { res: false, Val: "US2 'Unabel To Save User'" }
        return {
            res: true, Val: {
                TK: this.TKSer.Gen(NewUser),
                User: NewUser.Email
            }
        }
    }

    @Get("/Val/:Email")
    public async ExistUser(@Param("Email") Email: string) {
        if (await this.UserSer.FindEmail(Email))
            return { res: false }
        return { res: true }
    }
}