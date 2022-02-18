import App from './app';
import channelController from "./controller/channel.controller";
const app = new App(
    [new channelController()],
    5000,
);

app.listen();