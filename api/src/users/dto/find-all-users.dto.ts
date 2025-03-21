import { UserProfile, UserCategory } from '../entities/user.entity';

export class FindAllUsersDto {
  profile?: UserProfile;
  category?: UserCategory;
}
