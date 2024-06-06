import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Enterprise} from "./entities/enterprise.entity";
import {User} from "../users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Enterprise, User]),],
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
    exports: [EnterpriseService],
})
export class EnterpriseModule {}
