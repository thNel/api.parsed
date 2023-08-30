import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {School} from "@/typeorm/entities/schools";
import {Course} from "@/typeorm/entities/courses";
import {Lesson} from "@/typeorm/entities/lessons";

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {
  }

  async getSchoolList() {
    return await this.schoolRepository.find({});
  }

  async getCourseList(schoolId: number) {
    return await this.courseRepository.find({relations: {lessons: true}, where: {school: {id: schoolId}}});
  }

  async getLessonList(courseId: number) {
    return await this.lessonRepository.findBy({course: {id: courseId}});
  }
}