import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { Repository } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  count() {
    return this.userRepository.count({ where: { status: UserStatus.Active } });
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(findAllUsersDto?: FindAllUsersDto) {
    const { profile, category } = findAllUsersDto || {};

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (profile) {
      queryBuilder.andWhere('user.profile = :profile', { profile });
    }

    if (category) {
      queryBuilder.andWhere('user.category = :category', { category });
    }

    queryBuilder.orderBy('user.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.create(updateUserDto);
    await this.userRepository.update(id, user);
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async updateProfilePicture(id: string, filename: string) {
    // TODO: delete old picture
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.picture = filename;
    return this.userRepository.save(user);
  }
}
