import {Injectable} from '@nestjs/common';
import {IsNull, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {School} from "@/typeorm/entities/schools";
import {Course} from "@/typeorm/entities/courses";
import {Lesson} from "@/typeorm/entities/lessons";
import {Category} from "@/typeorm/entities/category";

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
  ) {
  }

  async getSchoolList() {
    return await this.schoolRepository.findBy({});
  }

  async getCategoryList(schoolId: number) {
    const answer = await this.categoryRepository.find({relations: {courses: true}, where: {school: {id: schoolId}}});
    const unClassified = await this.courseRepository.find({where: {school: {id: schoolId}, category: IsNull()}})
    if (unClassified.length)
      return [...answer, {id: -1, title: 'Без категории', poster: 'none', hidden: true}];
    return answer;
  }

  async getCourseList(schoolId: number, categoryId?: number) {
    return await this.courseRepository.findBy({school: {id: schoolId}, category: categoryId ? {id: categoryId} : IsNull()});
  }

  async getLessonList(courseId: number) {
    return await this.lessonRepository.findBy({course: {id: courseId}});
  }
}