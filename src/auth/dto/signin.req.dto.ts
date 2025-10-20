import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('Request')
export class SignInReqDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of user',
    default: 'admin@admin.com',
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: 'Plaintext password of user',
    default: 'password',
  })
  password!: string;
}
