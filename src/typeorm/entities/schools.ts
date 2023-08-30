import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "@/typeorm/entities/courses";

@Entity({name: 'schools'})
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  rootUrl: string;

  @Column({nullable: false})
  poster: string;

  @Column({nullable: false, default: false})
  hidden: boolean;

  @OneToMany(() => Course, (courses) => courses.school, {nullable: true, cascade: ['insert', 'recover', 'update']})
  courses: Course[];
}