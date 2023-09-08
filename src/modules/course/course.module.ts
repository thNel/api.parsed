import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Lesson} from "@/typeorm/entities/lessons";
import {Course} from "@/typeorm/entities/courses";
import {School} from "@/typeorm/entities/schools";
import {CourseService} from "@/modules/course/course.service";
import {CourseController} from "@/modules/course/course.controller";
import {Category} from "@/typeorm/entities/category";

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Course, School, Category])],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {
}