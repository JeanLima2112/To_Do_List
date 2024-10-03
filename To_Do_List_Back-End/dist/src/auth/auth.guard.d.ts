import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly configService;
    private jwtSecret;
    constructor(jwtService: JwtService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
