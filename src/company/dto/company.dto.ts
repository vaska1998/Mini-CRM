import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from '../entity/company.entity';

@ApiTags('Request')
export class CompanyDto {
  @ApiProperty({
    description: 'If of company',
  })
  id?: string;

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

  static fromEntity(entity: CompanyEntity): CompanyDto {
    const { id, name, email, website } = entity;

    return {
      id,
      name,
      email,
      website,
    };
  }
}
