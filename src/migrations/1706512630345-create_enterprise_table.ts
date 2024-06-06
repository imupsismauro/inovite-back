import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createEnterpriseTable1706512630345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'enterprise',
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
                        name: 'cnpj',
                        type: 'varchar',
                        length: '30',
                        isNullable: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: true
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '100',
                        isNullable: true
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'number',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {name: 'created_at', type: 'timestamp', default: 'now()', isNullable: true},
                    {name: 'deleted_at', type: 'timestamp', isNullable: true},
                    {name: 'updated_at', type: 'timestamp', default: 'now()', isNullable: true},
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enterprise');
    }
}
