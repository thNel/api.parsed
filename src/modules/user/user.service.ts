import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '@/typeorm/entities/user';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({username});
  }

  async register(username: string, password: string): Promise<void> {
    if (await this.findOne(username)) {
      throw new Error('Такой пользователь уже существует!');
    }
    const crypted = await bcrypt.hash(password, 10);
    await this.usersRepository.save({
      username,
      password: crypted,
    });
  }

  async seen(user: User): Promise<User> {
    return await this.usersRepository.save({...user, lastSeen: (new Date(Date.now())),});
  }
}