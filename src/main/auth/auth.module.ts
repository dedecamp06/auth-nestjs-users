import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { CreateJWTApplication } from 'src/application/auth/createJWT.application';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard, CreateJWTApplication],
  controllers: [AuthController],
  exports: [JwtModule, JwtAuthGuard, CreateJWTApplication],
})
export class AuthModule {}
