import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ExpenseModel } from 'src/core/models';

@Entity()
export class Expense implements ExpenseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('date')
  date: string;

  @ManyToOne(() => User, (user) => user.expenses, { nullable: false })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column('float')
  value: number;
}
