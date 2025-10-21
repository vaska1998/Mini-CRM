import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionRootEntity } from '../entities/collection.root.entity';
import * as validator from 'validator';
import { Company } from '../company/company.model';

@Schema()
export class Employee extends CollectionRootEntity {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({
    validate: {
      validator: (value: string) => !value || validator.isEmail(value),
      message: 'Invalid email format',
    },
  })
  email?: string;

  @Prop()
  phone?: string;

  @Prop({
    type: [String],
    ref: () => Company,
  })
  companies?: string[];
}

export type EmployeeDocument = Employee & Document;

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

export const EmployeeMongooseModule = MongooseModule.forFeature([
  { name: Employee.name, schema: EmployeeSchema },
]);
