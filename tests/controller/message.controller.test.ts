import "../base";
import App from '../../src/app';
import ChannelController from '../../src/controller/channel.controller';
import request from 'supertest';
import { getRepository } from 'typeorm';
import CreateChannelMessageRequest from "../../src/interfaces/request/create-channel-message.interface";
import Channel from '../../src/entity/channel.entity';

describe('The Massage Controller', () => {
    describe('post /channels/:id/messages', () => {
        it('should return ok when create channel message', async () => {
            const channelController = new ChannelController();
            const app = new App([
                channelController,
            ]);
            const channel = getRepository(Channel).create({name:"Jobs"})
            await getRepository(Channel).save(channel);

            const requestBody: CreateChannelMessageRequest = {
                title: 'Jobs',
                content: 'Good news, our company is hiring........'
            };

            await request(app.getServer())
                .post(`${channelController.path}/${channel.id}/messages`)
                .send(requestBody)
                .expect(200);
        })
    })
});