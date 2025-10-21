import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: AuthConstants.Jwt.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
