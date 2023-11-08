import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "@/typeorm/entities/courses";
import {Category} from "@/typeorm/entities/category";

@Entity({name: 'schools'})
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  rootUrl: string;

  @Column({nullable: true})
  poster: string;

  @Column({nullable: false, default: false})
  hidden: boolean;

  @OneToMany(() => Course, (courses) => courses.school, {nullable: true, cascade: ['insert', 'recover', 'update']})
  courses: Course[];

  @OneToMany(() => Category, (categories) => categories.school, {nullable: true, cascade: ['insert', 'recover', 'update']})
  categories: Category[];
}