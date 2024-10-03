import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserResponse, UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findByUserName(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${newUser.username}' already registered`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.name = newUser.name;
    dbUser.username = newUser.username;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username, name } = await this.usersRepository.save(dbUser);
    return { id, username, name };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      name: userFound.name,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
