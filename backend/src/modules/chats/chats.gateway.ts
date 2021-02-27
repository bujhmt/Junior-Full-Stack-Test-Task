import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { Chat } from './interfaces/chat.interface'
import { Logger } from '@nestjs/common'
import { ChatsService } from './chats.service'

@WebSocketGateway()
export class ChatsGateway {
    constructor(private readonly chatsService: ChatsService) {}

    private logger: Logger = new Logger('ChatsGateway')
}
