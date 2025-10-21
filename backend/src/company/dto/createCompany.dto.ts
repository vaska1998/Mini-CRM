import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Request')
export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of company',
    default: 'Company Name',
  })
  name!: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'Email of company',
    default: 'company@test.com',
  })
  email?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'Website of company',
    default: 'https://test.com',
  })
  website?: string;
}
