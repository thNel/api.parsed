import {Injectable} from '@nestjs/common';
// import {HttpException, HttpStatus} from '@nestjs/common';
// import parsedDump from './dump.json';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Course} from "@/typeorm/entities/courses";
import {School} from "@/typeorm/entities/schools";
import {Lesson} from "@/typeorm/entities/lessons";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(School)
    private schoolsRepository: Repository<School>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {
  }

  getHello(): string {
    return 'Hello World 2!';
  }

  // async readDump(schoolDump: {title: string, poster: string, rootUrl: string}): Promise<void> {
  //   if (await this.schoolsRepository.findOneBy({title: schoolDump.title, rootUrl: schoolDump.rootUrl, poster: schoolDump.poster}))
  //     throw new HttpException({message: 'Такая школа уже существует!'}, HttpStatus.BAD_REQUEST);
  //   const school = await this.schoolsRepository.save(schoolDump);
  //   for (const courseDump of parsedDump) {
  //     const course = await this.coursesRepository.save({
  //       school,
  //       externalId: courseDump.id.toString(),
  //       title: courseDump.title,
  //       poster: courseDump.poster,
  //     });
  //     for (const lessonDump of courseDump.lessons) {
  //       await this.lessonsRepository.save({
  //         course,
  //         title: lessonDump.title,
  //         url: lessonDump.url,
  //         type: lessonDump.type,
  //         extraData: lessonDump.extraData,
  //       })
  //     }
  //   }
  // }
}
