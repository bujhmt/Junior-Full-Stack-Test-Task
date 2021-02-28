import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { UsersService } from '../modules/users/users.service'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import getBotsEntities from '../bots/bots.entities'
import { User } from '../modules/users/interfaces/user.interface'
import CreateMessageDto from '../modules/messages/dto/create-message.dto'
import OutputMessageDto from '../modules/messages/dto/output-message.dto'
import { MessagesService } from '../modules/messages/messages.service'

let bots: User[] = []

@WebSocketGateway()
export class BotsGateway implements OnGatewayInit {
    constructor(private readonly userService: UsersService,
                private readonly messagesService: MessagesService
    ) {}

    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger('BotsGateway')

    async afterInit(server: Server) {
        try {
            const createBotsEntities = getBotsEntities()               // create bots
            await this.userService.deleteBots()
            bots = await Promise.all(createBotsEntities.map(async (bot) =>
                (await this.userService.signUp(bot)).user,
            ))
            this.logger.log('Bots initialized')
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    @SubscribeMessage('NEW_MESSAGE')
    async sendResponse(client: Socket, {text, owner, addressee}: CreateMessageDto): Promise<void> {
        if (addressee.role === 'bot') {
            switch (addressee.username) {
                case 'Echo Bot':
                    const responseEcho = await this.messagesService.createMessage({
                        text,
                        addressee: owner,
                        owner: addressee
                    })
                    await setTimeout(() => this.server.to(owner.currentConnectionId).emit('MESSAGE', responseEcho as OutputMessageDto), 200)
                    break
                case 'Reverse Bot':
                    const responseReverse = await this.messagesService.createMessage({
                        text: text.split('').reverse().join(''),
                        addressee: owner,
                        owner: addressee
                    })
                    await setTimeout(() => {
                        this.server.to(owner.currentConnectionId).emit('MESSAGE', responseReverse as OutputMessageDto)
                    }, 3000)
                    break
            }
        }
    }
}
