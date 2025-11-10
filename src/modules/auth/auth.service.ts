import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(dto: CreateUserDto) {
        const existing = await this.usersService.findByEmail(dto.email);

        if(existing) throw new UnauthorizedException('User already exist with the given email');

        const user = await this.usersService.create(dto);

        return {
            message: 'User created successfully!',
            id: user.id,
            email: user.email,
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if(!user) throw new UnauthorizedException('Invalid login credential! Please try again!');

        const isMatch = await bcrypt.compare(loginDto.password, user.password);

        if(!isMatch) throw new UnauthorizedException("The password you entered is incorrect. Please try again!");

        const payload = {sub: user.id, role: user.role};

        const access_token =  await this.jwtService.signAsync({payload})

        return {
            user,
            accessToken: access_token,
        }
    }

    async validateUser(id:string) {}
}
