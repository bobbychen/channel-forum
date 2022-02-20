import 'dotenv/config';
import {Connection} from "typeorm/connection/Connection";
import {createConnection} from "typeorm";
import config from "../src/config/ormconfig";

let connection: Connection;
beforeAll(async () => {
    connection = await createConnection(config);
})

afterAll(async () => {
    await connection.close();
})