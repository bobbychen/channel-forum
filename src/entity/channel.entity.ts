import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Channel {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name: string;
}

export default Channel;