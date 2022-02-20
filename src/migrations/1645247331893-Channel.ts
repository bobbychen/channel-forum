import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Channel1645247331893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "channel",
            columns: [
                {name: "id", type: "int", isPrimary: true,isGenerated:true,generationStrategy:"increment"},
                {name: "name", type: "varchar"}
            ]}
        ),true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("channel");
    }

}
