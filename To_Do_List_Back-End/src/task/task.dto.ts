import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  DONE = 'DONE',
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  user_id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum;

  @IsString()
  expirationDate: string;
}

export interface FindAllParameters {
  user_id: string;
}

export class TaskRouteParameters {
  @IsUUID()
  id: string;
}
