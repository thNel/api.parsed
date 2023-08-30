import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "@/typeorm/entities/courses";


export enum LessonType {
  youtube,
}

@Entity({name: 'lessons'})
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  url: string;

  @Column({nullable: false, default: false})
  hidden: boolean;

  @Column({type: 'enum', enum: LessonType, default: LessonType.youtube})
  type: LessonType;

  @ManyToOne(() => Course, (course) => course.lessons, {cascade: true})
  course: Course;
}