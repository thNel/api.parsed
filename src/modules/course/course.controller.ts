import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CourseService} from "@/modules/course/course.service";
import {AxiosParams, ServerMessage} from "@/interfaces";
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

  @Public()
  @Get('/:schoolId')
  async getCategories(@Param('schoolId') schoolId: string) {
    if (isNaN(+schoolId))
      return <ServerMessage>{error: true, message: 'ID школы может содержать только цифры!'};
    return await this.courseService.getCategoryList(Math.round(+schoolId));
  }

  @Public()
  @Get('/:schoolId/:categoryId')
  async getCourses(@Param() {schoolId, categoryId}: { schoolId: string, categoryId: string }) {
    if (isNaN(+schoolId) || isNaN(+categoryId))
      return <ServerMessage>{error: true, message: 'ID категории и школы могут содержать только цифры!'};
    return await this.courseService.getCourseList(Math.round(+schoolId), +categoryId < 0 ? null : Math.round(+categoryId));
  }

  @Public()
  @Get('/:schoolId/:categoryId/:courseId')
  async getLessons(@Param() {schoolId, categoryId, courseId}: {
    schoolId: string,
    categoryId: string,
    courseId: string
  }) {
    const isNonCategory = categoryId === 'none';
    if (isNaN(+schoolId) || (isNaN(+categoryId) && !isNonCategory) || isNaN(+courseId))
      return <ServerMessage>{error: true, message: 'ID курса может содержать только цифры!'};
    return await this.courseService.getLessonList(Math.round(+courseId));
  }

  @Public()
  @Post('/getVimeoVideo')
  getVimeoVideo(@Body() params: AxiosParams) {
    return this.courseService.getVimeoVideo(params);
  }
}
