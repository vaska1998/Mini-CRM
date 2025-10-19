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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateEmployeeDto } from './dto/create.employee.dto';
import { EmployeeEntity } from './entity/employee.entity';

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
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<EmployeeEntity[]> {
    this.logger.log(`Getting all employees`);
    const employees = await this.employeeService.findAll();
    return employees.map((employee) => EmployeeEntity.encode(employee));
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
