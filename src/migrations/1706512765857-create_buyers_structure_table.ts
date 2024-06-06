import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createBuyersStructureTable1706512765857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'buyers_structures',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'buyer_id', type: 'integer', isNullable: true },
                    { name: 'product_id', type: 'integer', isNullable: true },
                    { name: 'structure_id', type: 'integer', isNullable: true },
                    { name: 'store_id', type: 'integer', isNullable: true },
                    {name: 'created_at', type: 'timestamp', default: 'now()', isNullable: true},
                    {name: 'deleted_at', type: 'timestamp', isNullable: true},
                    {name: 'updated_at', type: 'timestamp', default: 'now()', isNullable: true},
                ],
            }),
            true,
        );
        await queryRunner.createForeignKey('buyers_structures', new TableForeignKey({
            columnNames: ['buyer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'buyers',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('buyers_structures');
        await queryRunner.dropColumn('buyers_structures', 'buyer_id');

    }

}
