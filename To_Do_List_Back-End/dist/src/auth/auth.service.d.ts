import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private jwtExpirationTimeInSeconds;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    signIn(username: string, password: string): Promise<AuthResponseDto>;
}
