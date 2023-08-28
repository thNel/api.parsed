import { Module } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/typeorm/entities/user';
import {UserController} from "@/user/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {
}