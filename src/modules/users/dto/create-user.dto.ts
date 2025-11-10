import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { UserRole } from "../user.entity"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(6)
    password:string

    @IsOptional()
    @IsEnum({UserRole}, {message: 'role must be one of the following value: admin, user'})
    role?: UserRole
}