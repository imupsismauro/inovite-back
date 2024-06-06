import {MigrationInterface, QueryRunner, Table} from "typeorm";
import * as bcrypt from 'bcryptjs';
export class createUserTable1706504292508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '150',
                        isNullable: false
                    },
                    {
                        name: 'document',
                        type: 'varchar',
                        length: '20',
                        isNullable: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '200',
                        isNullable: false
                    },
                    {
                        name: 'is_admin',
                        type: 'integer',
                        default: 0
                    },
                    {name: 'created_at', type: 'timestamp', default: 'now()', isNullable: true},
                    {name: 'deleted_at', type: 'timestamp', isNullable: true},
                    {name: 'updated_at', type: 'timestamp', default: 'now()', isNullable: true},
                    {
                        name: 'last_login_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'reset_token',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'integer',
                        default: 10
                    },
                    {
                        type: 'varchar',
                        name: 'confirmation_token',
                        isNullable: true
                    }

                ],
            }),
            true,
        );
        const hashedPassword = await bcrypt.hash('inovite@2021', 10);
        await queryRunner.query(
            `INSERT INTO users (name, document, email, is_admin, password) VALUES ('Inovite Admin', null, 'admin@inovite.com.br', 1, '${hashedPassword}')`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
