import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { UsersService } from '../modules/users/users.service'
import { User } from '../modules/users/interfaces/user.interface'
import { Socket } from 'socket.io'
import { Logger } from '@nestjs/common'
import { MessagesService } from '../modules/messages/messages.service'
import { Message } from '../modules/messages/interfaces/message.interface'

interface Contact {
    user: User
    lastMsg?: Message
    unreadCount?: number
}

@WebSocketGateway()
export class ContactsGateway {
    constructor(private readonly userService: UsersService, private readonly messagesService: MessagesService) {}

    private logger: Logger = new Logger('ContactsGateway')

    @SubscribeMessage('GET_CONTACTS')
    async handleMessage(client: Socket, payload: any): Promise<Contact[]> {
        try {
            const users: User[] = await this.userService.getAllWithoutOwn(payload.userId)
            const owner = await this.userService.findById(payload.userId)
            return Promise.all(
                users.map(async (user) => {
                    return {
                        user,
                        lastMsg: await this.messagesService.getLatest(owner, user),
                        unreadCount: await this.messagesService.getUnreadCount(owner, user),
                    }
                }),
            )
        } catch (err) {
            this.logger.error(err.message)
        }
    }
}
