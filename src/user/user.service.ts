import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getByEmail(email: string): Promise<User> {
    this.logger.log(`Getting user with email: ${email}`);
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }
}
