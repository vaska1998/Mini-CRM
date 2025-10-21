import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as validator from 'validator';
import { CollectionRootEntity } from '../entities/collection.root.entity';

@Schema()
export class Company extends CollectionRootEntity {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({
    validate: {
      validator: (value: string) => !value || validator.isEmail(value),
      message: 'Invalid email format',
    },
  })
  email?: string;

  @Prop({ type: Buffer })
  logo?: Buffer;

  @Prop()
  logoMimeType?: string;

  @Prop({
    validate: {
      validator: (value: string) => !value || validator.isURL(value),
      message: 'Invalid URL format',
    },
  })
  website?: string;
}

export type CompanyDocument = Company & Document;

export const CompanySchema = SchemaFactory.createForClass(Company);

export const CompanyMongooseModule = MongooseModule.forFeature([
  { name: Company.name, schema: CompanySchema },
]);
