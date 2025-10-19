import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './company.model';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { UploadedLogoFile } from './dto/file.interface';
import sharp, { Metadata } from 'sharp';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(
    dto: CreateCompanyDto,
    file?: UploadedLogoFile,
  ): Promise<Company> {
    const company = new this.companyModel({
      ...dto,
      ...(file ? { logo: file.buffer, logoMimeType: file.mimetype } : {}),
    });

    return company.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
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
