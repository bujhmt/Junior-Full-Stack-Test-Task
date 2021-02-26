import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket } from 'socket.io'

@WebSocketGateway()
export class UsersGateway {
    private logger: Logger = new Logger('UsersGateway')

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): string {
        return 'Hello world!'
    }
}
