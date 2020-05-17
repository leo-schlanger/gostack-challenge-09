import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class CreateOrdersProductsKeys1589684801154
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'order_products',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersOrdersProducts',
        columnNames: ['order_products'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders_products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'order_products',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'ProductsOrdersProducts',
        columnNames: ['order_products'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders_products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'ProductsOrdersProducts');

    await queryRunner.dropColumn('products', 'order_products');

    await queryRunner.dropForeignKey('orders', 'OrdersOrdersProducts');

    await queryRunner.dropColumn('orders', 'order_products');
  }
}
