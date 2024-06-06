import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createPermissionsTable1706512667365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'permissions',
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
                        name: 'code',
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
        await queryRunner.dropTable('permissions');
    }


}
