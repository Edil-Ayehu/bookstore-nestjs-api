import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    'user',
    'admin',
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column({unique: true})
    email:string

    @Column()
    @Exclude()
    password:string

    @Column({type: 'enum',enum: UserRole, default: UserRole.user})
    role: UserRole

    @CreateDateColumn()
    createdAt:Date
}