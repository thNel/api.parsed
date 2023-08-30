import {Controller, Get, Param, Response} from '@nestjs/common';
import {CourseService} from "@/modules/course/course.service";
import {ServerMessage} from "@/interfaces";
import {Public} from "@/decorators/public";

@Controller({
  path: 'course',
  version: '1',
})
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) {}

  @Public()
  @Get('/')
  async getSchools() {
    return await this.courseService.getSchoolList();
  }

  @Get('/:schoolId')
  async getCourses(@Response() res, @Param('schoolId') schoolId: string) {
    if (isNaN(+schoolId))
      return res.send(<ServerMessage>{error: true, message: 'ID школы может содержать только цифры!'});
    return await this.courseService.getCourseList(Math.round(+schoolId));
  }

  @Get('/:schoolId/:courseId')
  async getLessons(@Response() res, @Param() {schoolId, courseId}: {schoolId: string, courseId: string}) {
    if (isNaN(+schoolId) || isNaN(+courseId))
      return res.send(<ServerMessage>{error: true, message: 'ID школы и ID курса могут содержать только цифры!'});
    return await this.courseService.getLessonList(Math.round(+courseId));
  }
}
