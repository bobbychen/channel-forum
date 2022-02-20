import 'dotenv/config';
import {Connection} from "typeorm/connection/Connection";
import {createConnection} from "typeorm";
import config from "../src/config/ormconfig";
import { getRepository } from 'typeorm';
import Channel from "../src/entity/channel.entity";
import Message from "../src/entity/message.entity";

let connection: Connection;
beforeAll(async () => {
    connection = await createConnection(config);
    await getRepository(Channel).clear();
    await getRepository(Message).clear();
})

afterAll(async () => {
    await connection.close();
})