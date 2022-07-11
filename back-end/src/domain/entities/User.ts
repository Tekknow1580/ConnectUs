import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity("users")
export default class User {

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