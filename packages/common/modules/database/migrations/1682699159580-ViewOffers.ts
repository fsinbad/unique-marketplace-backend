import { MigrationInterface, QueryRunner, SelectQueryBuilder, Table } from "typeorm";
import { View } from 'typeorm/schema-builder/view/View';
import { OfferEntity, ViewOffers } from "../entities";
import { DataSource } from "typeorm/data-source/DataSource";

export class ViewOffers1682699159580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    CREATE OR REPLACE VIEW
      "${queryRunner.manager.getRepository(ViewOffers).metadata.tableName}" AS
      ${(queryRunner.manager.getRepository(ViewOffers).metadata.expression as ((connection: DataSource) => SelectQueryBuilder<any>))(queryRunner.connection).getQuery()}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropView('view_offers');
  }
}
