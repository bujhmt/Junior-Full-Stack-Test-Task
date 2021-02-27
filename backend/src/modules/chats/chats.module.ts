import { Module } from '@nestjs/common'
import { ChatsService } from './chats.service'
import { ChatsGateway } from './chats.gateway'
import { DatabaseModule } from '../../core/database/database.module'
import { chatsProviders } from './chats.providers'

@Module({
    imports: [DatabaseModule],
    providers: [ChatsService, ...chatsProviders, ChatsGateway],
    exports: [ChatsService],
})
export class ChatsModule {}
