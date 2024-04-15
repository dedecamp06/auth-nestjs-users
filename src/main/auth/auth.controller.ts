import { Controller, Post, Body } from '@nestjs/common';
import { CreateJWTApplication } from 'src/application/auth/createJWT.application';

@Controller('auth')
export class AuthController {
  constructor(private readonly createJWTApplication: CreateJWTApplication) {}

  @Post()
  async loginAdmin(@Body() body: any) {
    return await this.createJWTApplication.run(body);
  }
}
