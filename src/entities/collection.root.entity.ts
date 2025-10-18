import { Prop } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

const safeUuid = uuid as unknown as () => string;

export abstract class CollectionRootEntity {
  @Prop({
    type: String,
    default: () => safeUuid(),
  })
  _id!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}
