import { CreateUserResponse, UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(newUser: UserDto): Promise<CreateUserResponse>;
    findByUserName(username: string): Promise<UserDto | null>;
}
