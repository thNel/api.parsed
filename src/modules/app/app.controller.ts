import {Controller, Get} from '@nestjs/common';
import {AppService} from '@/modules/app/app.service';
import {Public} from "@/decorators/public";

@Controller({version: '1'})
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Public()
  // @Get('readDump')
  // async readDump(@Response() res, @Query() query: {title: string, poster: string, rootUrl: string}) {
  //   if (query.title?.length && query.rootUrl?.length && query.poster?.length) {
  //       await this.appService.readDump({title: query.title, poster: query.poster, rootUrl: query.rootUrl});
  //       return res.send(<ServerMessage>{success: true, message: 'Parsed successfully!'});
  //   } else {
  //     console.log(query);
  //   }
  // }
}
