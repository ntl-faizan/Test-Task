import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findActiveUsers(): Promise<User[]> {
    return this.userRepo.find({
      where: { status: 'active' },
    });
  }

  async findOneById(userId: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
