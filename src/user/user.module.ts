import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { UserMongooseModule } from './user.model';

@Module({
  imports: [UserMongooseModule, forwardRef(() => AuthModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
