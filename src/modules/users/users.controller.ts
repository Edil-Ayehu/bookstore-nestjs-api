import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('findUserById/:id')
    async findOne(@Param('id') id:string) {
        return await this.usersService.findById(id);
    }

    @Get('findAll')
    async findAll() {
        return await this.usersService.findAll()
    }
}
