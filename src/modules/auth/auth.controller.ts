import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('create-user')
    async create(
        @Body() dto:CreateUserDto,
    ) {
        return await this.authService.register(dto)
    }

    @Post('login')
    async login(
        @Body() dto:LoginDto,
    ) {
        return await this.authService.login(dto)
    }
}
