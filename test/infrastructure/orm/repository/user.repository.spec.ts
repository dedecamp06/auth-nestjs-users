import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from 'src/core';
import { User } from 'src/infrastructure/orm/entities/user.entity';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockUserRepository: Partial<
    Record<keyof Repository<UserModel>, jest.Mock>
  >;

  beforeEach(async () => {
    mockUserRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    const userData: UserModel = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };
    mockUserRepository.save.mockResolvedValue(userData);

    expect(await repository.createUser(userData)).toEqual(userData);
    expect(mockUserRepository.save).toHaveBeenCalledWith(userData);
  });

  it('should find a user by id', async () => {
    const userData: UserModel = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };
    mockUserRepository.findOne.mockResolvedValue(userData);

    expect(await repository.findUserById(1)).toEqual(userData);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should find all users', async () => {
    const users: UserModel[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      },
    ];
    mockUserRepository.find.mockResolvedValue(users);

    expect(await repository.findAllUser()).toEqual(users);
  });

  it('should update a user', async () => {
    const userData: UserModel = {
      id: 1,
      name: 'John Updated',
      email: 'john@example.com',
      password: '654321',
    };
    mockUserRepository.save.mockResolvedValue(userData);

    expect(await repository.updateUser(userData)).toEqual(userData);
    expect(mockUserRepository.save).toHaveBeenCalledWith(userData);
  });

  it('should delete a user', async () => {
    const userId = 1;
    mockUserRepository.delete.mockResolvedValue(undefined);

    await repository.deleteUser(userId);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
  });

  it('should find a user by email and password', async () => {
    const userData: UserModel = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    };
    mockUserRepository.findOne.mockResolvedValue(userData);

    expect(
      await repository.findUserByEmailAndPassword('john@example.com', '123456'),
    ).toEqual(userData);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: {
        email: 'john@example.com',
        password: '123456',
      },
    });
  });
});
