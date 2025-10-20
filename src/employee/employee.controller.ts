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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateEmployeeDto } from './dto/create.employee.dto';
import { EmployeeEntity } from './entity/employee.entity';
import { EmployeesResDto } from './dto/employees.res.dto';

@ApiBearerAuth('access-token')
@Controller('employee')
export class EmployeeController {
  private readonly logger = new Logger('EmployeeController');
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create employee',
  })
  @ApiCreatedResponse({
    description: 'Employee created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateEmployeeDto): Promise<EmployeeEntity> {
    this.logger.log(`Creating employee with name: ${dto.firstName}`);
    const employee = await this.employeeService.create(dto);
    return EmployeeEntity.encode(employee);
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all employees',
  })
  @ApiCreatedResponse({
    description: 'Get all employees successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search employees by name or other criteria',
    example: 'John',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    type: String,
    description: 'Filter employees by company ID',
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
    @Query('companyId') companyId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<EmployeesResDto> {
    this.logger.log(
      `Getting employees (search=${search}, companyId=${companyId}, page=${page}, limit=${limit})`,
    );
    const { data, total } = await this.employeeService.findAll(
      search,
      companyId,
      Number(page),
      Number(limit),
    );
    return {
      data: data.map((e) => EmployeeEntity.encode(e)),
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get employee by id',
  })
  @ApiCreatedResponse({
    description: 'Get employee by id successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<EmployeeEntity> {
    this.logger.log(`Getting employee by id: ${id}`);
    const employee = await this.employeeService.findOne(id);
    return EmployeeEntity.encode(employee);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update employee by id',
  })
  @ApiCreatedResponse({
    description: 'Update employee by id successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    this.logger.log(`Updating employee by id: ${id}`);
    const employee = await this.employeeService.update(id, dto);
    return EmployeeEntity.encode(employee);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete employee by id',
  })
  @ApiCreatedResponse({
    description: 'Delete employee by id successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting employee by id: ${id}`);
    await this.employeeService.delete(id);
  }
}
