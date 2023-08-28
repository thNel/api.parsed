import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app/app.service';
import {Public} from "@/decorators/public";

@Controller({version: '1'})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
