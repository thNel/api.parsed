import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {School} from "@/typeorm/entities/schools";
import {Lesson} from "@/typeorm/entities/lessons";

@Entity({name: 'courses'})
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  externalId: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  poster: string;

  @Column({nullable: false, default: false})
  hidden: boolean;

  @ManyToOne(() => School, (school) => school.courses, {cascade: true})
  school: School;

  @OneToMany(() => Lesson, (lessons) => lessons.course, {nullable: true, cascade: ['insert', 'recover', 'update']})
  lessons: Lesson[];
}