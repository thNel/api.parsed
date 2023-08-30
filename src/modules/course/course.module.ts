import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Lesson} from "@/typeorm/entities/lessons";
import {Course} from "@/typeorm/entities/courses";
import {School} from "@/typeorm/entities/schools";
import {CourseService} from "@/modules/course/course.service";
import {CourseController} from "@/modules/course/course.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Course, School])],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {
}