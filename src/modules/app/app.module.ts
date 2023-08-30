import {Module} from '@nestjs/common';
import {AppController} from '@/modules/app/app.controller';
import {AppService} from '@/modules/app/app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {envData} from '@/constants';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from '@/modules/auth/guards/jwt';
import {AuthModule} from '@/modules/auth/auth.module';
import {User} from "@/typeorm/entities/user";
import {AdminModule} from "@/modules/admin/admin.module";
import {Course} from "@/typeorm/entities/courses";
import {School} from "@/typeorm/entities/schools";
import {Lesson} from "@/typeorm/entities/lessons";
import {CourseModule} from "@/modules/course/course.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
@Module({
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envData.dbHost,
      port: Number(envData.dbPort),
      username: envData.dbUser,
      password: envData.dbPass,
      database: envData.dbName,
      entities: [
        User,
        School,
        Course,
        Lesson,
      ],
      synchronize: envData.isDev,
    }),
    AuthModule,
    AdminModule,
    CourseModule,
    TypeOrmModule.forFeature([School, Course, Lesson]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'media'),
      exclude: ['/api/(.*)'],
      serveRoot: '/media',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {
}
