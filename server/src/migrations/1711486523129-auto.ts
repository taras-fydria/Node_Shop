import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1711486523129 implements MigrationInterface {
    name = 'Auto1711486523129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "productName" text NOT NULL, "productDescription" text NOT NULL, "quantityPerUnit" integer NOT NULL DEFAULT '1', "unitsInStock" integer NOT NULL, "discount" double precision, "createTimeStamp" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "UQ_faeabc94d0778daea8ed0a8a3c5" UNIQUE ("productName"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
