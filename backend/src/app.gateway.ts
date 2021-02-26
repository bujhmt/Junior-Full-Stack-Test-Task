import {
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { UsersService } from './modules/users/users.service'
import { User } from './modules/users/interfaces/user.interface'
import { CreateUserDto } from './modules/users/dto/create-user.dto'

const sessionsMap = {}

@WebSocketGateway()
export class AppGateway
    implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
    constructor(private readonly userService: UsersService) {}
    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger('AppGateway')

    afterInit(server: Server) {
        this.logger.log('Sockets started')
    }

    handleConnection(client: Socket): void {
        this.logger.log('New connection! id: ' + client.id)
        client.emit('ASK_JWT')
    }

    @SubscribeMessage('JWT_RECEIVED')
    async handleLogin(client: Socket, payload: any) {
        try {
            const token = payload.token
            const user: User = await this.userService.login(token, client.id)
            if (token) {
                sessionsMap[client.id] = user._id
                this.logger.log(`User login: ${user.username} ${user._id}`)
            }
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    @SubscribeMessage('JWT_FAILED')
    async handleSignUp(
        client: Socket,
        payload: CreateUserDto,
    ): Promise<string> {
        try {
            const data = await this.userService.signUp(payload)
            sessionsMap[client.id] = data.user._id

            return data.token
        } catch (err) {
            this.logger.error(err.message)
        }
    }

    handleDisconnect(client: Socket): void {
        try {
            this.userService.logout(sessionsMap[client.id])
            this.logger.log(`Client ${sessionsMap[client.id]} was disconnected`)
            delete sessionsMap[client.id]
        } catch (err) {
            this.logger.error(err.message)
        }
    }
}
