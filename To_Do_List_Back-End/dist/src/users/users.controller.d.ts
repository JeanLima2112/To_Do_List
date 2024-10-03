import { UsersService } from './users.service';
import { UserDto } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(user: UserDto): Promise<import("./user.dto").CreateUserResponse>;
}
