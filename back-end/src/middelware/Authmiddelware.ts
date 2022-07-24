import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request } from 'express';
import { TokenService } from '../service/TokenService';
import Container from 'typedi';

export class Authmiddelware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  constructor(private tokenService: TokenService) {
    this.tokenService = Container.get(TokenService);
  }

  use(request: Request, response: any, next: (err?: any) => any): any {
    var Auth = (request.headers.authorization || "").replace("Bearer ", "");
    var User = this.tokenService.Valadate(Auth);
    
    if (User === false)
      throw new Error("Invalid Token");
    next();
  }
}