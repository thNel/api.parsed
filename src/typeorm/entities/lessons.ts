import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "@/typeorm/entities/courses";


export enum LessonType {
  youtube,
  getcourse,
  vimeo,
}

type ExtraData = {
  description?: string;
  extraVideos?: {title: string, url: string, type: LessonType}[];
  extraImages?: {title: string, url: string}[];
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

  @Column({type: 'json', nullable: true, default: null})
  extraData: ExtraData;

  @ManyToOne(() => Course, (course) => course.lessons, {cascade: true})
  course: Course;
}