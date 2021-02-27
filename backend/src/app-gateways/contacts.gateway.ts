import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { UsersService } from '../modules/users/users.service'
import { User } from '../modules/users/interfaces/user.interface'
import { Socket } from 'socket.io'
import { Logger } from '@nestjs/common'
import { ChatsService } from '../modules/chats/chats.service'
import { Chat } from '../modules/chats/interfaces/chat.interface'

interface Contact {
    user: User
    lastMsg?: string
}

@WebSocketGateway()
export class ContactsGateway {
    constructor(private readonly userService: UsersService, private readonly chatsService: ChatsService) {}

    private logger: Logger = new Logger('ContactsGateway')

    @SubscribeMessage('GET_CONTACTS')
    async handleMessage(client: Socket, payload: any): Promise<Contact[]> {
        try {
            const contacts: Contact[] = []
            const users: User[] = await this.userService.getAllWithoutOwn(payload.userId)
            return users.map(user => {
                return {user}
            })
        } catch (err) {
            this.logger.error(err.message)
        }
    }
}
