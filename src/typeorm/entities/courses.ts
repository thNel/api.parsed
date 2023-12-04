import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {School} from "@/typeorm/entities/schools";
import {Lesson} from "@/typeorm/entities/lessons";
import {Category} from "@/typeorm/entities/category";

type ExtraData = {
  shortDescription?: string;
  description?: string;
}

@Entity({name: 'courses'})
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, default:'none'})
  externalId: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: true})
  poster: string;

  @Column({nullable: false, default: false})
  hidden: boolean;

  @Column({type: 'json', nullable: true, default: null})
  extraData: ExtraData;

  @ManyToOne(() => School, (school) => school.courses, {cascade: true})
  school: School;

  @ManyToOne(() => Category, (category) => category.courses, {cascade: true, nullable: true})
  category: Category;

  @OneToMany(() => Lesson, (lessons) => lessons.course, {nullable: true, cascade: ['insert', 'recover', 'update']})
  lessons: Lesson[];
}