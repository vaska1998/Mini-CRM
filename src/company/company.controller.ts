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
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

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
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<CompanyEntity[]> {
    this.logger.log(`Getting all companies`);
    const companies = await this.companyService.findAll();
    return companies.map((company) => CompanyEntity.encode(company));
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
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting company by id: ${id}`);
    await this.companyService.delete(id);
  }
}
