import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  count() {
    return this.userRepository.count();
  }

  create(createUserDto: CreateUserDto) {
    // TODO: encrypt password
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async updateProfilePicture(id: string, filename: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.picture = filename;
    return this.userRepository.save(user);
  }
}
