import { Types } from 'mongoose';
import { EUserRole } from 'src/user/enums/user.enum';


export type ATPayload = {
  sub: Types.ObjectId;
  role: EUserRole;
};