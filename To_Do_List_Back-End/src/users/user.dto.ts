import { IsNotEmpty } from 'class-validator';

export class UserDto {
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export interface CreateUserResponse {
  id: string;
  username;
  name: string;
}
