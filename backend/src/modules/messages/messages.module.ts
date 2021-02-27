import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { DatabaseModule } from '../../core/database/database.module'
import { messagesProviders } from './messages.providers'

@Module({
    imports: [DatabaseModule],
    providers: [MessagesService, ...messagesProviders],
    exports: [MessagesService],
})
export class MessagesModule {}
