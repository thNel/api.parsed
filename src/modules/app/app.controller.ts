import {Controller, Get} from '@nestjs/common';
import {AppService} from '@/modules/app/app.service';
import {Public} from "@/decorators/public";
// import {ServerMessage} from "@/interfaces";
// import {Query, Response} from '@nestjs/common';

@Controller({version: '1'})
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Public()
  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }


  // @Public()
  // @Get('readDump')
  // async readDump() {
  //       await this.appService.readDump();
  //       return {success: true, message: 'Parsed successfully!'};
  // }
}
