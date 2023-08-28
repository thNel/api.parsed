import {Module} from '@nestjs/common';
import {LocalStrategy} from '@/auth/strategies/local';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {envData} from '@/constants';
import {JwtStrategy} from '@/auth/strategies/jwt';
import {AuthService} from "@/auth/auth.service";
import {UsersModule} from "@/user/user.module";
import {AuthController} from "@/auth/auth.controller";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: envData.jwt.secret,
      signOptions: {expiresIn: envData.jwt.expires},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}