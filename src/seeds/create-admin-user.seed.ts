import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {User} from "../modules/users/entities/user.entity";

export default class CreateAdminUser implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const hashedPassword = await bcrypt.hash('inovite@2021', 10);
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {   name: 'Inovite Admin',
                    document: null,
                    email: 'admin@inovite.com.br',
                    password: hashedPassword,
                    is_admin: 1,},
            ])
            .execute();
    }
}
