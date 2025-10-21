import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionRootEntity } from '../entities/collection.root.entity';

@Schema()
export class User extends CollectionRootEntity {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  hashedPassword!: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserMongooseModule = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
