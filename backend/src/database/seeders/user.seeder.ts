import { Model } from 'mongoose';
import { UserDocument } from '../../user/user.model';
import { hash } from 'bcrypt';

export class UserSeeder {
  constructor(private readonly userModel: Model<UserDocument>) {}

  async run() {
    const existing = await this.userModel.findOne({ email: 'admin@admin.com' });
    if (existing) {
      console.log('Admin already exists');
      return;
    }

    const password = await hash('password', 10);
    await this.userModel.create({
      email: 'admin@admin.com',
      hashedPassword: password,
    });

    console.log('Admin created');
  }
}
