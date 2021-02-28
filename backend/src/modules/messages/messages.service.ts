import { Inject, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { MESSAGE_MODEL } from '../../core/constants'
import { Model } from 'mongoose'
import { Message } from './interfaces/message.interface'
import { User } from '../users/interfaces/user.interface'
import CreateMessageDto from './dto/create-message.dto'

@Injectable()
export class MessagesService {
    constructor(
        @Inject(MESSAGE_MODEL)
        private messageModel: Model<Message>,
    ) {}

    public async getChatMessages(owner: User, addressee: User): Promise<Message[]> {
        let messages: Message[] = []
        messages = messages.concat(await this.messageModel.find({owner, addressee}))
        messages = messages.concat(await this.messageModel.find({owner: addressee, addressee: owner}))
        return messages.sort((a, b) => moment(a.sent).valueOf() - moment(b.sent).valueOf())
    }

    public async createMessage({text, addressee, owner}: CreateMessageDto): Promise<Message> {
        const newMessage = new this.messageModel({text, owner, addressee})
        return await newMessage.save()
    }

    public async getLatest(owner: User, addressee: User): Promise<Message | undefined> {
        const a = await this.messageModel.findOne({owner, addressee}).sort({ sent: -1 }).limit(1).exec()
        const b = await this.messageModel.findOne({owner: addressee, addressee: owner}).sort({ sent: -1 }).limit(1).exec()
        if (a && b) return moment(a.sent).valueOf() > moment(b.sent).valueOf() ? a : b
        if (a) return a
        if (b) return b
    }

    public async getUnreadCount(owner: User, addressee: User): Promise<number> {
        let count = 0
        count += Number(await this.messageModel.find({owner, addressee, isRead: false}).countDocuments())
        count += Number(await this.messageModel.find({owner: addressee, addressee: owner, isRead: false}).countDocuments())
        return count
    }
}
