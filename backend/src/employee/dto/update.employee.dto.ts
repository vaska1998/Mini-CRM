import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@ApiTags('Request')
export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'First name of employee',
    default: 'John',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Last name of employee',
    default: 'Doe',
  })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'Email of employee',
    default: 'employee@test.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Phone of employee',
    default: '+380991234567',
  })
  phone?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({
    description: 'Companies of employee',
    example: ['652abc...', '652def...'],
  })
  @ValidateNested({ each: true })
  companies?: string[];
}
