import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthedUser } from './types/authed-user.type';
import { SignInDto } from './dtos/signin.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { ATPayload } from './types/access-token-payload.type';
import * as bcrypt from 'bcrypt';
import { JwtConstants } from './constants';
@Injectable()
export class AuthService {

    constructor(
        private userSVC: UserService,
        private JwtSVC: JwtService,
      ) {}
   
      public async signIn(
        signedInUser:SignInDto
      ) {
        try {
          const user = await this.userSVC.findOneByEmail(signedInUser.email);
          if (!user) {
            throw new UnauthorizedException('User not found');
          }
          const validUser = await this.verifyHash(signedInUser.password, user.password);
          if (!validUser) {
            throw new UnauthorizedException('wrong email or password');
          }
          const token = this.generateAccessToken(user);
          const authedUser: AuthedUser = new AuthedUser(user, token);
          return authedUser
    
        } catch (err) {
          console.log(err);
          throw new InternalServerErrorException("Failed To Login!");
        }
      }

      private generateAccessToken(user: IUser): string {
        const ATPayload: ATPayload = {
          sub: user._id,
          role: user.role,
        };
        const token = this.JwtSVC.sign(ATPayload, {
          secret: JwtConstants.secret,
          expiresIn: '20d',
        });
    
        return token;
      }

      private async verifyHash(
        userPassword: string,
        hashedPassword: string,
      ): Promise<boolean> {
        return await bcrypt.compare(userPassword, hashedPassword);
      }
}
