import {
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage, WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { UsersService } from '../modules/users/users.service'
import { User } from '../modules/users/interfaces/user.interface'
import { CreateUserDto } from '../modules/users/dto/create-user.dto'
import OutputUserDto from '../modules/users/dto/output-user.dto'
import { MessagesService } from '../modules/messages/messages.service'
import * as randomWords from 'random-words'
import OutputMessageDto from '../modules/messages/dto/output-message.dto'

const sessionsMap = {}

const MIN_BOT_RESPONSE_AWAIT = 3000 //10000
const MAX_BOT_RESPONSE_AWAIT = 4000 //120000

@WebSocketGateway()
export class AuthGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
    constructor(private readonly userService: UsersService,
                private  readonly  messagesService: MessagesService) {
    }

    private logger: Logger = new Logger('AppGateway')

    @WebSocketServer()
    server: Server

    async afterInit(server: Server) {
        this.logger.log('Sockets started')

        setInterval(async () => {                               // Spam bot (the worst place in my code, sorry)
            const spamBot = await this.userService.findByUsername('Spam Bot')
            const userIds: string[] = Object.values(sessionsMap)
            userIds.map(async (userId) => {
                const user = await this.userService.findById(userId)
                const message = await this.messagesService.createMessage({text: randomWords(), owner: spamBot, addressee: user})
                this.server.to(user.currentConnectionId).emit('MESSAGE', message as OutputMessageDto)
            })
        }, Math.floor(Math.random() * MAX_BOT_RESPONSE_AWAIT) + MIN_BOT_RESPONSE_AWAIT)

    }

    handleConnection(client: Socket): void {
        this.logger.log('New connection! id: ' + client.id)
    }

    @SubscribeMessage('JWT_RECEIVED')
    async handleLogin(client: Socket, payload: any) {
        try {
            const token = payload.token
            const user: User = await this.userService.login(token, client.id)
            if (token) {
                sessionsMap[client.id] = user._id
                this.logger.log(`User login: ${user.username} ${user._id}`)
                client.broadcast.emit('CONTACT_LOGIN', { user: user as OutputUserDto })
            }
            return user as OutputUserDto
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    @SubscribeMessage('JWT_FAILED')
    async handleSignUp(client: Socket, payload: CreateUserDto): Promise<string> {
        try {
            const { user, token } = await this.userService.signUp(payload)
            sessionsMap[client.id] = user._id
            this.logger.log(`New user created: ${user.username} ${user._id}`)
            return token
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    async handleDisconnect(client: Socket): Promise<void> {
        try {
            if (sessionsMap[client.id]) {
                const user = await this.userService.logout(sessionsMap[client.id])
                client.broadcast.emit('CONTACT_LOGOUT', { user: user as OutputUserDto })
                this.logger.log(`Client ${sessionsMap[client.id]} was disconnected`)
                delete sessionsMap[client.id]
            }
        } catch (err) {
            this.logger.error(err.message)
        }
    }
}
