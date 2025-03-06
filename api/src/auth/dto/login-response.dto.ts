export class LoginResponseDto {
  public accessToken!: string;
  public user!: {
    id: string;
    name: string;
    email: string;
    profile: string;
  };
}
