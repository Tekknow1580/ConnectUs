import { Service } from "typedi";
import * as bcrypt from "bcrypt";

@Service()
export class PasswordService {
    public async Encode(PlainTextPass: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(PlainTextPass, salt);
    }

    public async Validate(PlainTextPass: string,HashPass: string){
        try{
            return await bcrypt.compare(PlainTextPass,HashPass);
        }catch{return false}
    }
}