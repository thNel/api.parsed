import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {School} from "@/typeorm/entities/schools";
import {Course} from "@/typeorm/entities/courses";

@Entity({name: 'categories'})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: true})
  poster: string;

  @Column({nullable: false, default: false})
  hidden: boolean;

  @ManyToOne(() => School, (school) => school.categories, {cascade: true})
  school: School;

  @OneToMany(() => Course, (lessons) => lessons.category, {nullable: true, cascade: ['insert', 'recover', 'update']})
  courses: Course[];
}