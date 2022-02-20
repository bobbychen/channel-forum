import "../base";
import App from '../../src/app';
import ChannelController from '../../src/controller/channel.controller';
import request from 'supertest';
import { getRepository } from 'typeorm';
import CreateChannelMessageRequest from "../../src/interfaces/request/create-channel-message.interface";
import Channel from '../../src/entity/channel.entity';
import Message from '../../src/entity/message.entity';
import PageObj from "../../src/interfaces/response/page-obj.interface";

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

        it('should return bad request when create channel message to a invalid channel', async () => {
            const channelController = new ChannelController();
            const app = new App([
                channelController,
            ]);

            const invalidChannel = "12312312";

            const requestBody: CreateChannelMessageRequest = {
                title: 'Jobs',
                content: 'Good news, our company is hiring........'
            };

            await request(app.getServer())
                .post(`${channelController.path}/${invalidChannel}/messages`)
                .send(requestBody)
                .expect(400);
        })

        it('should return bad request when create channel message with invalid body', async () => {
            const channelController = new ChannelController();
            const app = new App([
                channelController,
            ]);
            const channel = getRepository(Channel).create({name:"Jobs"})
            await getRepository(Channel).save(channel);

            const requestBody: CreateChannelMessageRequest = {
                title: '',
                content: ''
            };

            await request(app.getServer())
                .post(`${channelController.path}/${channel.id}/messages`)
                .send(requestBody)
                .expect(400);
        })
    })

    describe('get /channels/:id/messages', () => {
        it('should messages page by channel id', async () => {
            const channelController = new ChannelController();
            const app = new App([
                channelController,
            ]);
            const channel = getRepository(Channel).create({name:"Jobs"})
            await getRepository(Channel).save(channel);
            const message = getRepository(Message).create({
                title: 'Jobs',
                content: 'Good news, our company is hiring........',
                channelId: channel.id
            });
            await getRepository(Message).save(message);


            const res  = await request(app.getServer())
                .get(`${channelController.path}/${channel.id}/messages?page=1&size=10`)
                .expect(200);

            const page: PageObj = res.body;
            expect(page.page).toEqual(1);
            expect(page.total).toEqual(1);
            expect(page.size).toEqual(10);

        })
    })
});