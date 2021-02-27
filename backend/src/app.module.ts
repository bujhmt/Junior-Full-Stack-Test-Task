import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './core/database/database.module'
import { UsersModule } from './modules/users/users.module'
import { AppService } from './app.service'
import { AppGateway } from './app.gateway'
import { MessagesModule } from './modules/messages/messages.module'
import { ChatsModule } from './modules/chats/chats.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
        MessagesModule,
        ChatsModule,
    ],
    providers: [AppService, AppGateway],
})
export class AppModule {}
