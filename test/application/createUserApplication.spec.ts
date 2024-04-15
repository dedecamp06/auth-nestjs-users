import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';
import { BadGatewayException } from '@nestjs/common';
import { UserModel } from 'src/core';
import { CreateUserApplication } from 'src/application';

describe('CreateUserApplication', () => {
  let service: CreateUserApplication;
  let mockUserRepository;

  beforeEach(async () => {
    mockUserRepository = {
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserApplication,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserApplication>(CreateUserApplication);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const user: UserModel = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: '12512512512',
    };
    mockUserRepository.createUser.mockResolvedValue(user);

    const result = await service.run(user);
    expect(result).toEqual(user);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
  });

  it('should throw a BadGatewayException when repository throws an error', async () => {
    const user: UserModel = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: '12512512512',
    };
    mockUserRepository.createUser.mockRejectedValue(
      new Error('Database error'),
    );

    await expect(service.run(user)).rejects.toThrow(BadGatewayException);
  });
});
