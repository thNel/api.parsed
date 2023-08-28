import {Body, Controller, Get, Post, Request, Response, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from '@/auth/guards/local';
import {Public} from '@/decorators/public';
import {UserPassPair} from '@/interfaces/user';
import {AuthService} from "@/auth/auth.service";
import {envData} from "@/constants";
import {ServerMessage} from "@/interfaces";

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {

  private cookieSetOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: !envData.isDev,
    maxAge: 48 * 60 * 60 * 1000,
  }
  constructor(private authService: AuthService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const message = await this.authService.login(req.user);
    res.cookie(
      'access_token',
      message.access_token,
      this.cookieSetOptions
    );
    res.send(message);
  }

  @Get('logout')
  async logout (@Request() req, @Response() res) {
    res.cookie(
      'access_token',
      '',
      {...this.cookieSetOptions, maxAge: 1}
    );
    return res.send(<ServerMessage>{success: true, message: 'Выход выполнен успешно'});
  }

  @Public()
  @Post('register')
  async register(@Body() credentials: UserPassPair) {
    return await this.authService.register(credentials);
  }

}