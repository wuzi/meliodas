import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  User,
  UserCategory,
  UserProfile,
  UserStatus,
} from '../users/entities/user.entity';
import { UsersService as UserService } from '../users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.comparePassword(password)) {
      return user;
    }
    return null;
  }

  login(user: User): LoginResponseDto {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(loginDto: LoginDto): Promise<LoginResponseDto> {
    let user = await this.usersService.findOneByEmail(loginDto.email);

    if (user) {
      throw new UnauthorizedException('Email already in use');
    }

    user = await this.usersService.create({
      email: loginDto.email,
      password: loginDto.password,
      name: loginDto.email.split('@')[0],
      phone: '',
      profile: UserProfile.User,
      registrationNumber: '',
      category: UserCategory.Other,
      course: '',
      status: UserStatus.Active,
    });

    return this.login(user);
  }
}
