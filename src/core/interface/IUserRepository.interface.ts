import { UserModel } from '../models';

export interface IUserRepository {
  createUser(user: UserModel): Promise<UserModel>;

  findUserById(id: any): Promise<UserModel | undefined>;

  findAllUser(): Promise<UserModel[]>;

  updateUser(expeusernse: UserModel): Promise<UserModel>;

  deleteUser(id: number): Promise<void>;
}
