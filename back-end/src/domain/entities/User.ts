import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity("users")
export default class User {

    constructor(UserName: string, Password: string, Discription: string = "", Age : number = 0){
        this.UserName = UserName;
        this.Password = Password;
        this.Discription = Discription;
        this.Age = Age.toString();
    }

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    UserName: string;

    @Column()
    Password: string;

    @Column()
    Discription: string;

    @Column()
    Age: string;

}