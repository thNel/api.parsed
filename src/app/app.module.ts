import {Module} from '@nestjs/common';
import {AppController} from '@/app/app.controller';
import {AppService} from '@/app/app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {envData} from '@/constants';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from '@/auth/guards/jwt';
import {AuthModule} from '@/auth/auth.module';
import {User} from "@/typeorm/entities/user";
import {AdminModule} from "@/admin/admin.module";
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
      ],
      synchronize: envData.isDev,
    }),
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
