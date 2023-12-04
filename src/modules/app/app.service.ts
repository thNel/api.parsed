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

  // async readDump(): Promise<void> {
  //   const schoolInfo = {title: parsedDump.title, rootUrl: parsedDump.rootUrl, poster: parsedDump.poster};
  //   if (await this.schoolsRepository.findOneBy(schoolInfo))
  //     throw new HttpException({message: 'Такая школа уже существует!'}, HttpStatus.BAD_REQUEST);
  //   const school = await this.schoolsRepository.save(schoolInfo);
  //   for (const courseDump of parsedDump.courses) {
  //     const course = await this.coursesRepository.save({
  //       school,
  //       externalId: courseDump.externalId,
  //       title: courseDump.title,
  //       poster: courseDump.poster,
  //       extraData: courseDump.extraData,
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
