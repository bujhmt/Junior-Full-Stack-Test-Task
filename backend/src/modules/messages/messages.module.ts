import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesGateway } from './messages.gateway'
import { DatabaseModule } from '../../core/database/database.module'
import { messagesProviders } from './messages.providers'

@Module({
    imports: [DatabaseModule],
    providers: [MessagesService, ...messagesProviders, MessagesGateway],
    exports: [MessagesService],
})
export class MessagesModule {}
