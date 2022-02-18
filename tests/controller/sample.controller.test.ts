import App from '../../src/app';
import ChannelController from '../../src/controller/channel.controller';
import request from 'supertest';


describe('The Sample Controller', () => {
    describe('get /channel', () => {
        it('return helloWorld', async () => {
            const channelController = new ChannelController();
            const app = new App([
                channelController,
            ]);
            const res = await request(app.getServer())
                .get(`${channelController.path}`)
                .expect(200);

            expect(res.body && res.body.title).toStrictEqual('HelloWorld')
        })
    })
});