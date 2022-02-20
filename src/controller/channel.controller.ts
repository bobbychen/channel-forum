import express from 'express';
import _ from 'lodash';
import { getRepository } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import CreateChannelRequest from "../interfaces/request/create-channel.interface";
import Channel from "../entity/channel.entity";
import HttpException from "../common/exceptions/HttpException";
import ChannelService from "../service/channel.service";
import CreateChannelMessageRequest from "../interfaces/request/create-channel-message.interface";
import httpException from "../common/exceptions/HttpException";

class ChannelController implements Controller {
    public path = '/channels';
    public router = express.Router();
    private Repository = getRepository(Channel);
    private channelService = new ChannelService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.get);
        this.router.post(this.path, this.create);
        this.router.post(`${this.path}/:id/messages`, this.createMessage);
        this.router.get(`${this.path}/:id/messages`, this.getMessages);
    }
    private get = (request: express.Request, response: express.Response) =>{
        response.send({"title": "HelloWorld"});
    }

    private create = async (request: express.Request, response: express.Response,next: express.NextFunction) =>{
        const postData: CreateChannelRequest = request.body;
        if(_.isEmpty(postData.name)) {
            next(new HttpException(400, "channel name shoud not be empty."));
        }else{
            const newPost = this.Repository.create(postData);
            await this.Repository.save(newPost);
            response.send(newPost);
        }
    };

    private createMessage = async (request: express.Request, response: express.Response,next: express.NextFunction)=> {
        const channelId: string = request.params.id;
        const channelMessage :CreateChannelMessageRequest = request.body;
        this.channelService.createMessage(Number(channelId), channelMessage)
            .then((message)=>{
                response.status(200).send(message);
            })
            .catch((error:HttpException) => {
                response.status(error.status).send(error.message)
            })
    }

    private getMessages = async (request: express.Request, response: express.Response,next: express.NextFunction)=>{
        const channelId: string = request.params.id;
        const {page, size} = request.query;
        this.channelService.getMessages(Number(channelId), Number(page), Number(size))
            .then((pageObj) =>{
                response.status(200).send(pageObj);
            }).catch((error:HttpException) => {
            response.status(error.status).send(error.message)
        })
    };
}

export default ChannelController;
