import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AnnouncementDocument = HydratedDocument<Announcement>;
@Schema({ timestamps: true })
export class Announcement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
