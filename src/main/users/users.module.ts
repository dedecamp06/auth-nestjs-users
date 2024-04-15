import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from 'src/infrastructure/orm/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';
import {
  CreateUserApplication,
  DeleteOneUserApplication,
  FindOneUserApplication,
  FindUsersApplication,
  UpdateUserApplication,
} from 'src/application';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UserRepository,
    FindUsersApplication,
    FindOneUserApplication,
    CreateUserApplication,
    UpdateUserApplication,
    DeleteOneUserApplication,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
