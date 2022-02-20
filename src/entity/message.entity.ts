import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
class Message {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column({name:"channel_id"})
    public channelId: number;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;
}

export default Message;