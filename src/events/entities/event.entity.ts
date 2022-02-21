// in a production application, events should have its own module instead

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop(SchemaTypes.Mixed)
  payload: Record<string, any>
}

export const EventSchema = SchemaFactory.createForClass(Event);
