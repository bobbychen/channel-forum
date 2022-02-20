import express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import CreateChannelRequest from "../interfaces/request/create-channel.interface";
import Channel from "../entity/channel.entity";

class ChannelController implements Controller {
    public path = '/channels';
    public router = express.Router();
    private Repository = getRepository(Channel);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.get);
        this.router.post(this.path, this.create);
    }
    private get = (request: express.Request, response: express.Response) =>{
        response.send({"title": "HelloWorld"});
    }

    private create = async (request: express.Request, response: express.Response) =>{
        const postData: CreateChannelRequest = request.body;
        const newPost = this.Repository.create(postData);
        await this.Repository.save(newPost);
        response.send(newPost);
    };
}

export default ChannelController;
