import { Inject, Injectable } from '@nestjs/common'
import { CHAT_MODEL } from '../../core/constants'
import { Model } from 'mongoose'
import { Chat } from './interfaces/chat.interface'
import CreateChatDto from './dto/create-chat.dto'

@Injectable()
export class ChatsService {
    constructor(
        @Inject(CHAT_MODEL)
        private chatModel: Model<Chat>,
    ) {}

    async getUserChats(userId: string): Promise<Chat[]> {
        const chats: Chat[] = await this.chatModel
            .find({})
            .populate({ path: 'User', match: { _id: userId } })
            .populate({ path: 'Message', limit: 1, options: { sort: { sent: -1 } } })
            .exec()
        console.log(chats)
        return chats
    }

    // async createChat({users} : CreateChatDto): Promise<Chat> {
    //     const newChat = new this.chatModel()
    //     newChat.users.push()
    // }
}
