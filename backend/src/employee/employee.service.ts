import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './employee.model';
import { Model, FilterQuery } from 'mongoose';
import { CreateEmployeeDto } from './dto/create.employee.dto';
import { UpdateEmployeeDto } from './dto/update.employee.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    let companyIds: string[] = [];

    if (createEmployeeDto.companies?.length) {
      companyIds = [...new Set(createEmployeeDto.companies)];

      const companies = await this.companyService.findManyByIds(companyIds);

      if (companies.length !== companyIds.length) {
        throw new BadRequestException('One or more company IDs are invalid');
      }
    }

    const createdEmployee = new this.employeeModel({
      ...createEmployeeDto,
      companies: companyIds,
    });

    return createdEmployee.save();
  }

  async findAll(
    search?: string,
    companyId?: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Employee[]; total: number }> {
    const filter: FilterQuery<EmployeeDocument> = {};

    if (search) {
      const matchedCompanies = await this.companyService.findAll(search);
      const matchedCompanyIds = matchedCompanies.data.map((c) => c._id);

      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { companies: { $in: matchedCompanyIds } },
      ];
    }

    if (companyId) {
      filter.companies = companyId;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.employeeModel.find(filter).skip(skip).limit(limit).exec(),
      this.employeeModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    if (dto.companies?.length) {
      dto.companies = [...new Set(dto.companies)];
      const companies = await this.companyService.findManyByIds(dto.companies);
      if (companies.length !== dto.companies.length) {
        throw new BadRequestException('One or more company IDs are invalid');
      }
    }

    const employee = await this.employeeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('companies')
      .exec();

    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async delete(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Employee not found');
  }
}
