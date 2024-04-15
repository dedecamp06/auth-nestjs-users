import { UserModel } from 'src/core/models';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Expense, (expense) => expense.userId)
  expenses: Expense[];
}
