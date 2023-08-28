import {Module} from '@nestjs/common';
import {LocalStrategy} from '@/modules/auth/strategies/local';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {envData} from '@/constants';
import {JwtStrategy} from '@/modules/auth/strategies/jwt';
import {AuthService} from "@/modules/auth/auth.service";
import {UsersModule} from "@/modules/user/user.module";
import {AuthController} from "@/modules/auth/auth.controller";

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