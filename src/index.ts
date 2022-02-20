import App from './app';
import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import config from './config/ormconfig';
import channelController from "./controller/channel.controller";

(async () => {
    try {
        await createConnection(config);
    } catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }
    const app = new App(
        [
            new channelController(),
        ],
    );
    app.listen();
})();