import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity("users")
export default class User {

    constructor(Email: string, UserName: string, Password: string, Discription: string = "", Age : number = 0){
        this.Email = Email;
        this.UserName = UserName;
        this.Password = Password;
        this.Discription = Discription;
        this.Age = Age;
    }

    @PrimaryGeneratedColumn()
    ID: number;

    @PrimaryColumn()
    Email: string;

    @Column()
    UserName: string;

    @Column()
    Password: string;

    @Column()
    Discription: string;

    @Column()
    Age: number = 0;

}