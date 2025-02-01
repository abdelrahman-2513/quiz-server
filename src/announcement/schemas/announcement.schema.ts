import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type AnnouncementDocument = HydratedDocument<Announcement>;
@Schema({ timestamps: true })
export class Announcement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;


}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
