import express from 'express';
import Controller from '../interfaces/controller.interface';

class ChannelController implements Controller {
    public path = '/channels';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.get);
    }
    private get = (request: express.Request, response: express.Response) =>{
        response.send({"title": "HelloWorld"});
    }
}

export default ChannelController;
