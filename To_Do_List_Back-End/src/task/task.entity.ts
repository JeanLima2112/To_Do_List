import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  expirationDate: string;
}
