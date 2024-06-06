import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateEnterpriseDto} from './dto/create-enterprise.dto';
import {UpdateEnterpriseDto} from './dto/update-enterprise.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Enterprise} from "./entities/enterprise.entity";
import {ILike, Repository} from "typeorm";
import {User} from "../users/entities/user.entity";

@Injectable()
export class EnterpriseService {
    constructor(
        @InjectRepository(Enterprise)
        private enterpriseRepository: Repository<Enterprise>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }

    async create(createEnterpriseDto: CreateEnterpriseDto) {

        if (!createEnterpriseDto){
            throw new HttpException("Invalid body", HttpStatus.BAD_REQUEST);
        }

        const newEnterprise = await this.enterpriseRepository.create(createEnterpriseDto);
        await this.enterpriseRepository.save(newEnterprise);

        return newEnterprise;
    }

    async findAll(search: string) {
        if(search === undefined){
            search = '';
        }

        return await this.enterpriseRepository.find({
            where: {
                name: ILike(`%${search}%`)
            },
            order: {
                created_at: "ASC"
            }
        });
    }

    async findOne(id: number) {
        return await this.enterpriseRepository.findOne({
            id:id
        });
    }

    async update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
        const oldEnterprise = await this.enterpriseRepository.findOne({
            id: id
        })

        if (!updateEnterpriseDto || !oldEnterprise){
            throw new HttpException("Invalid body", HttpStatus.BAD_REQUEST);
        }

        return await this.enterpriseRepository.update(id, updateEnterpriseDto);
    }

    async remove(id: number) {
        const oldEnterprise = await this.enterpriseRepository.findOne({
            id: id
        })

        if (!oldEnterprise){
            throw new HttpException("Invalid body", HttpStatus.BAD_REQUEST);
        }

        return await this.enterpriseRepository.softDelete({
            id: id
        });
    }

    async select(id: number, user: User) {
        console.log(user);
        console.log(id);
        const oldUser = await this.userRepository.findOne({
            id: user.id
        });

        if (!oldUser){
            throw new HttpException("Invalid body", HttpStatus.BAD_REQUEST);
        }

        return await this.userRepository.update(oldUser.id, {
            enterprise_id: id
        });

    }
}
