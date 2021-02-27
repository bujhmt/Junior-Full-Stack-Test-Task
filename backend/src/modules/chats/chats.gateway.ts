import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { Chat } from './interfaces/chat.interface'
import { Logger } from '@nestjs/common'
import { ChatsService } from './chats.service'

@WebSocketGateway()
export class ChatsGateway {
    constructor(private readonly chatsService: ChatsService) {}

    private logger: Logger = new Logger('ChatsGateway')

    @SubscribeMessage('GET_CHATS')
    async getChats(client: Socket, payload: { userId: string }): Promise<Chat[]> {
        try {
            if (payload && payload.userId) return await this.chatsService.getUserChats(payload.userId)
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    // @SubscribeMessage('NEW_CHAT')
    // async createChat(client: Socket, payload: {users: string[]}): Promise<Chat> {
    //     try {
    //         if (payload && payload.users && payload.users.length === 2) {
    //
    //         }
    //     } catch(err) {
    //         this.logger.error(err.message)
    //     }
    // }
}
