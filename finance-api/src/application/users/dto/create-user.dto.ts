import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\s*.*\S.*\s*$/, { message: 'firstName should not be empty' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\s*.*\S.*\s*$/, { message: 'firstName should not be empty' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password must have at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol',
    },
  )
  password: string;
}
