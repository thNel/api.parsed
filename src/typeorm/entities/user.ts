import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export enum UserGroup {
  ADMIN = 'admin',
  MODERATOR = 'moder',
  PEASANT = 'peasant',
}

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({type: 'enum', enum: UserGroup, default: UserGroup.PEASANT})
  userGroup: UserGroup;

  @Column({nullable: true, default: null})
  email: string;

  @Column({nullable: true, default: null})
  telegram: string;

  @Column({nullable: true, default: null})
  vk: string;

  @Column({nullable: false})
  password: string;

  @Column({type: 'timestamp', nullable: true, default: null})
  lastSeen: Date | null;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}