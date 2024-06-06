import {Injectable} from '@nestjs/common';
import {ConsoleService} from 'nestjs-console';

@Injectable()
export class Service {

    constructor(
        private readonly consoleService: ConsoleService,
    ) {
        const cli = this.consoleService.getCli();

        this.consoleService.createCommand(
            {
            command: 'db:seed',
            description: 'Ola mundo'
            },
            this.dbSeed,
            cli
        )
    }

    dbSeed = async (): Promise<void | Promise<void>> => {
        console.log('db:seed')
    }
}
