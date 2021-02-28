import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { MessagesService } from '../modules/messages/messages.service'
import { Server, Socket } from 'socket.io'
import CreateMessageDto from '../modules/messages/dto/create-message.dto'
import { UsersService } from '../modules/users/users.service'
import OutputMessageDto from '../modules/messages/dto/output-message.dto'
import { Logger } from '@nestjs/common'
import { User } from '../modules/users/interfaces/user.interface'

@WebSocketGateway()
export class MessagesGateway {
    constructor(
        private readonly messagesService: MessagesService,
        private readonly usersService: UsersService
    ) {}

    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger('MessagesGateway')

    @SubscribeMessage('NEW_MESSAGE')
    async createMessage(client: Socket, createMessageDto: CreateMessageDto): Promise<OutputMessageDto> {
        try {
            const newMessage = await this.messagesService.createMessage(createMessageDto)
            const addressee = await this.usersService.findById(createMessageDto.addressee._id)
            this.server.to(addressee.currentConnectionId).emit('MESSAGE', newMessage as OutputMessageDto)
            return newMessage as OutputMessageDto
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    @SubscribeMessage('GET_MESSAGES')
    async getMessages(client: Socket, { owner, addressee }: {owner: User, addressee: User}): Promise<OutputMessageDto[]> {
        try {
            const messages = await this.messagesService.getChatMessages(owner, addressee)
            return messages as OutputMessageDto[]
        } catch (err) {
            console.log(err)
            this.logger.error(err.message)
        }
    }
}
