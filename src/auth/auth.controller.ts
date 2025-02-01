import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthedUser } from './types/authed-user.type';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const authedUser:AuthedUser = await this.authService.signIn(signInDto);
    return res.status(HttpStatus.OK).json({ message: 'User signed in successfully', authedUser });
  }
}
