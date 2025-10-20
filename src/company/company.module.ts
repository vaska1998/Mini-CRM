import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyMongooseModule } from './company.model';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [CompanyMongooseModule, forwardRef(() => EmployeeModule)],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
