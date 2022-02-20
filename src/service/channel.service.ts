import _ from 'lodash';
import { getRepository } from 'typeorm';
import CreateChannelMessageRequest from "../interfaces/request/create-channel-message.interface";
import Channel from "../entity/channel.entity";
import Message from "../entity/message.entity";
import HttpException from "../common/exceptions/HttpException";

class ChannelService {
    private channelRepository = getRepository(Channel);
    private messageRepository = getRepository(Message);

    public async createMessage (id: number, message: CreateChannelMessageRequest){
        if(_.isEmpty(message.title) || _.isEmpty(message.content)) {
            throw new HttpException(400, "message body is invalid");
        }
        const channel = await this.channelRepository.findOne({id});
        if(_.isEmpty(channel)) {
            throw new HttpException(400, "channel id invalid.");
        }

        const channelMessage = this.messageRepository.create(message);
        channelMessage.channelId = id;
        return await this.messageRepository.save(channelMessage);
    }

    public async getMessages (id: number, page: number, size: number){
        // const [data, count] = await this.messageRepository.findAndCount({
        //     where: {channelId: id},
        //     order: {createdAt: 'DESC'},
        //     take:(page - 1) * size,
        //     skip:size,
        // });
        // return {
        //     data,
        //     total: count,
        //     page,
        //     size,
        // }
        const {data,current_page,total} = await this.messageRepository.createQueryBuilder().setParameters({
            page,
            per_page: size
        }).paginate();
        return {
            data,
            size,
            total,
            page: current_page
        }
    }
}

export default ChannelService;