import { Service } from "typedi";

@Service()
export class Dummy {

    hello(){
        return "Hello world";
    }
}