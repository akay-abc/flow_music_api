import { IsEmail, IsIn, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { AuthRole, AuthStatus } from 'src/constant/auth.constant';

export const AUTH_STATUS = [AuthStatus.Active, AuthStatus.Inactive] as const;
export const AUTH_ROLE = [AuthRole.Admin, AuthRole.Normal] as const;

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(5, 20)
  password: string;

  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(10)
  username: string;

  @IsIn(AUTH_ROLE)
  role: string;

  @IsIn(AUTH_STATUS)
  status: number;
}
