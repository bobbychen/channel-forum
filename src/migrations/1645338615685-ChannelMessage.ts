import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ChannelMessage1645338615685 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "message",
            columns: [
                {name: "id", type: "int", isPrimary: true,isGenerated:true,generationStrategy:"increment"},
                {name: "title", type: "varchar"},
                {name: "content", type: "varchar"},
                {name: "channel_id", type: "int"},
                {name: 'created_at',type: 'timestamp',default: 'now()'}
            ]}
        ),true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("message");
    }

}
