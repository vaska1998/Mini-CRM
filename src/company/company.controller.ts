import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { CompanyEntity } from './entity/company.entity';
import { Express } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { CompaniesResponseDto } from './dto/companies.res.dto';

@ApiBearerAuth('access-token')
@Controller('company')
export class CompanyController {
  private logger = new Logger('CompanyController');
  constructor(private readonly companyService: CompanyService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create company',
  })
  @ApiCreatedResponse({
    description: 'Company created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseInterceptors(FileInterceptor('logo'))
  @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateCompanyDto,
  ): Promise<CompanyEntity> {
    this.logger.log(`Creating company with name: ${dto.name}`);
    const logoFile = await this.companyService.processLogo(file);
    const company = await this.companyService.create(dto, logoFile);
    return CompanyEntity.encode(company);
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all companies',
  })
  @ApiCreatedResponse({
    description: 'Get all companies successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search companies by name or other criteria',
    example: 'John',
  })
  @ApiQuery({
    name: 'employeeId',
    required: false,
    type: String,
    description: 'Filter companies by employee ID',
    example: '123bgd',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of employees per page',
    example: 10,
  })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('search') search?: string,
    @Query('employeeId') employeeId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<CompaniesResponseDto> {
    this.logger.log(
      `Getting companies (search=${search}, employeeId=${employeeId}, page=${page}, limit=${limit})`,
    );
    const { data, total } = await this.companyService.findAll(
      search,
      employeeId,
      Number(page),
      Number(limit),
    );

    return {
      data: data.map((c) => CompanyEntity.encode(c)),
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get company by id',
  })
  @ApiCreatedResponse({
    description: 'Get company by id successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<CompanyEntity> {
    this.logger.log(`Getting company by id: ${id}`);
    const company = await this.companyService.findOne(id);
    return CompanyEntity.encode(company);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update company by id',
  })
  @ApiCreatedResponse({
    description: 'Update company by id successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    this.logger.log(`Updating company by id: ${id}`);
    const logoFile = await this.companyService.processLogo(file);
    const company = await this.companyService.update(id, dto, logoFile);
    return CompanyEntity.encode(company);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete company by id',
  })
  @ApiCreatedResponse({
    description: 'Delete company by id successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting company by id: ${id}`);
    await this.companyService.delete(id);
  }
}
