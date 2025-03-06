import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService as UserService } from '../users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';

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
}
