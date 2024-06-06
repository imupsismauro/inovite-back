import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBuyersTable1706512717789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'buyers',
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
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'document',
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
        await queryRunner.dropTable('buyers');
    }

}
