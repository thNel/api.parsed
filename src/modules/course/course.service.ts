import {Injectable} from '@nestjs/common';
import {IsNull, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {School} from "@/typeorm/entities/schools";
import {Course} from "@/typeorm/entities/courses";
import {Lesson} from "@/typeorm/entities/lessons";
import {Category} from "@/typeorm/entities/category";
import {AxiosParams, ServerMessage} from "@/interfaces";
import {firstValueFrom} from "rxjs";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    private readonly httpService: HttpService,
  ) {
  }

  async getSchoolList() {
    return await this.schoolRepository.findBy({});
  }

  async getCategoryList(schoolId: number) {
    const answer = await this.categoryRepository.find({relations: {courses: true}, where: {school: {id: schoolId}}});
    const unClassified = await this.courseRepository.find({where: {school: {id: schoolId}, category: IsNull()}})
    if (unClassified.length)
      return [...answer, {id: -1, title: 'Без категории', poster: null, hidden: true}];
    return answer;
  }

  async getCourseList(schoolId: number, categoryId?: number) {
    return await this.courseRepository.findBy({school: {id: schoolId}, category: categoryId ? {id: categoryId} : IsNull()});
  }

  async getLessonList(courseId: number) {
    return await this.lessonRepository.findBy({course: {id: courseId}});
  }

  async getVimeoVideo({url, config}: AxiosParams): Promise<ServerMessage> {
    try {
      const {data} = await firstValueFrom(
        this.httpService.get(url, config)
      );
      return {success: true, message: data};
    } catch (e) {
      if (e?.message)
        return {error: true, message: e.message}
      return {error: true, message: 'Неизвестная ошибка'}
    }
  }
}