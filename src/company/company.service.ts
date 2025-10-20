import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './company.model';
import { FilterQuery, Model } from 'mongoose';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { UploadedLogoFile } from './dto/file.interface';
import sharp, { Metadata } from 'sharp';
import { EmployeeService } from '../employee/employee.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(
    dto: CreateCompanyDto,
    file?: UploadedLogoFile,
  ): Promise<Company> {
    const company = new this.companyModel({
      ...dto,
      ...(file ? { logo: file.buffer, logoMimeType: file.mimetype } : {}),
    });
    const savedCompany = await company.save();
    await this.notificationsService.sendNewCompanyNotification(savedCompany);
    return savedCompany;
  }

  async findAll(
    search?: string,
    employeeId?: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Company[]; total: number }> {
    const filter: FilterQuery<CompanyDocument> = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (employeeId) {
      const employee = await this.employeeService.findOne(employeeId);

      if (!employee.companies?.length) {
        return { data: [], total: 0 };
      }

      filter._id = { $in: employee.companies };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.companyModel.find(filter).skip(skip).limit(limit).exec(),
      this.companyModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findManyByIds(ids: string[]): Promise<Company[]> {
    return this.companyModel.find({ _id: { $in: ids } }).exec();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).exec();
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(
    id: string,
    dto: UpdateCompanyDto,
    file?: UploadedLogoFile,
  ): Promise<Company> {
    const updatedData = {
      ...dto,
      logo: file?.buffer,
      logoMineType: file?.mimetype,
    };

    const company = await this.companyModel
      .findByIdAndUpdate(id, updatedData, { new: true })
      .exec();
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async delete(id: string): Promise<void> {
    const result = await this.companyModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Company not found');
  }

  async processLogo(
    file?: UploadedLogoFile,
  ): Promise<UploadedLogoFile | undefined> {
    let logoFile: UploadedLogoFile | undefined;

    if (file) {
      const multerFile: UploadedLogoFile = {
        buffer: file.buffer,
        mimetype: file.mimetype,
      };

      const metadata: Metadata = await sharp(multerFile.buffer).metadata();
      if (metadata.width < 100 || metadata.height < 100) {
        throw new BadRequestException('Logo must be at least 100×100 pixels');
      }

      logoFile = multerFile;
    }
    return logoFile;
  }
}
