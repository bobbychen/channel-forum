import "../base";
import App from '../../src/app';
import ChannelController from '../../src/controller/channel.controller';
import request from 'supertest';
import CreateChannelRequest from "../../src/interfaces/request/create-channel.interface";

describe('The Channel Controller', () => {
    describe('post /channels', () => {
        it('should return ok when create channel', async () => {
            const channelController = new ChannelController();
            const app = new App([
                channelController,
            ]);
            const requestBody: CreateChannelRequest = {
                name: 'Jobs'
            };

            await request(app.getServer())
                .post(`${channelController.path}`)
                .send(requestBody)
                .expect(200);
        })
    })
});