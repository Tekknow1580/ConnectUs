import { Service } from "typedi";
import User from "../domain/entities/User";
import * as jwt from "jsonwebtoken";

@Service()
export class TokenService{
    readonly Secrit = "My Secrit";

    public Gen(user:User){
        return jwt.sign(Object.assign({}, user),this.Secrit,{
            "expiresIn":"2h"
        })
    }

    public Valadate(Token:string){
        try{
            return jwt.verify(Token,this.Secrit);
        }catch{return false}
    }
}