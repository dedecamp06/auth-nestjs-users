import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthModel, UserModel } from 'src/core';
import { ApplicationInterface } from 'src/core/interface';
import { UserRepository } from 'src/infrastructure/orm/repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateJWTApplication implements ApplicationInterface {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async run(params: AuthModel) {
    try {
      if (!params.email || !params.password)
        throw new BadRequestException('Body not found!');

      const findUser = await this.repository.findUserByEmailAndPassword(
        params.email,
        params.password,
      );

      if (!findUser) throw new UnauthorizedException();

      const payload: AuthModel = {
        email: findUser.email,
        name: findUser.name,
      };

      const token = {
        token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '60y',
        }),
      };

      return token;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
