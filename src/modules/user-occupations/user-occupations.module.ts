import {Module} from '@nestjs/common';
import {UserOccupationsService} from './user-occupations.service';
import {UserOccupationsController} from './user-occupations.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserOccupation} from './entities/user-occupation.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOccupation])
    ],
    controllers: [
        UserOccupationsController
    ],
    providers: [
        UserOccupationsService
    ],
    exports: [
        UserOccupationsService
    ]
})
export class UserOccupationsModule {
}
