import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of company',
    default: 'Company Name',
  })
  name?: string;

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
