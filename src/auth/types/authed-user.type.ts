import { Types } from "mongoose";
import { EUserRole } from "src/user/enums/user.enum";
import { IUser } from "src/user/interfaces/user.interface";

export class LoggedUser implements IUser {
    _id: Types.ObjectId;
    email: string;
    name: string;
    role: EUserRole;
   

    constructor(user: IUser) {
      this._id = user._id;
      this.email = user.email;
      this.name = user.name;
      this.role = user.role;

    }
  }
  export class AuthedUser {
    user: IUser;
  
    access_token: string;
  
    constructor(user: IUser, accessToken: string) {
      this.user = new LoggedUser(user);
      this.access_token = accessToken;
    }
  }