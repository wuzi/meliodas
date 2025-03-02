import { UserProfile, UserCategory, Status } from '../entities/user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  profile: UserProfile;
  registrationNumber: string;
  category: UserCategory;
  course: string;
  department?: string;
  status: Status;
  password: string;
}
