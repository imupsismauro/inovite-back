import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class addColunmUserTable1706523457715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({name: 'enterprise_id', type: 'integer', isNullable: true, default: null}));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['enterprise_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'enterprise',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'enterprise_id');
    }

}
