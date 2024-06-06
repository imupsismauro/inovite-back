import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createEnterpriseDatabaseTable1706512656654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'enterprise_database',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'enterprise_id', type: 'integer', isNullable: true },
                    {
                        name: 'host',
                        type: 'varchar',
                        length: '100',
                        isNullable: true
                    },
                    {
                        name: 'database',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'port',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'charset',
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

        await queryRunner.createForeignKey('enterprise_database', new TableForeignKey({
            columnNames: ['enterprise_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'enterprise',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enterprise_database');
        await queryRunner.dropColumn('enterprise_database', 'enterprise_id');
    }

}
