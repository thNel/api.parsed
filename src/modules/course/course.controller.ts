import {Controller, Get, Param} from '@nestjs/common';
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
  async getCategories(@Param('schoolId') schoolId: string) {
    if (isNaN(+schoolId))
      return <ServerMessage>{error: true, message: 'ID школы может содержать только цифры!'};
    return await this.courseService.getCategoryList(Math.round(+schoolId));
  }

  @Get('/:schoolId/:categoryId')
  async getCourses(@Param() {schoolId, categoryId}: {schoolId: string, categoryId: string}) {
    if (isNaN(+schoolId) || isNaN(+categoryId))
      return <ServerMessage>{error: true, message: 'ID категории может содержать только цифры!'};
    return await this.courseService.getCourseList(Math.round(+schoolId), +categoryId < 0 ? null : Math.round(+categoryId));
  }

  @Get('/:schoolId/:categoryId/:courseId')
  async getLessons(@Param() {schoolId, categoryId, courseId}: {schoolId: string, categoryId: string, courseId: string}) {
    const isNonCategory = categoryId === 'none';
    if (isNaN(+schoolId) || (isNaN(+categoryId) && !isNonCategory) || isNaN(+courseId))
      return <ServerMessage>{error: true, message: 'ID курса может содержать только цифры!'};
    return await this.courseService.getLessonList(Math.round(+courseId));
  }
}
