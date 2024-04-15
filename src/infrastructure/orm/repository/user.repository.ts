import { Repository } from 'typeorm';
import { IUserRepository } from 'src/core/interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/core';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  async createUser(user: UserModel): Promise<UserModel> {
    return await this.userRepo.save(user);
  }

  async findUserById(id: number): Promise<UserModel | undefined> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findAllUser(): Promise<UserModel[]> {
    return await this.userRepo.find();
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    return await this.userRepo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserModel | undefined> {
    return await this.userRepo.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }
}
