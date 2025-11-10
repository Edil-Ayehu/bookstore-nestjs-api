import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private configService: ConfigService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];

        if(!authHeader) throw new UnauthorizedException('Authorization header is missing.');

        const token = authHeader.split(' ')[1];

        try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        request.user = payload
        return true;

        } catch(e) {
            throw new UnauthorizedException('Invalid or expired token!');
        }
    }
}