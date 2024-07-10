import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema()
export class Property {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  rentalPrice: number;

  @Prop()
  description: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
