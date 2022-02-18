import App from './app';
import 'dotenv/config';
import channelController from "./controller/channel.controller";
const app = new App(
    [new channelController()]
);

app.listen();