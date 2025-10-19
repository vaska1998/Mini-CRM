import { forwardRef, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeMongooseModule } from './employee.model';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [EmployeeMongooseModule, forwardRef(() => CompanyModule)],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
