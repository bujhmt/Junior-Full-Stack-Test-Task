import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './core/database/database.module'
import { UsersModule } from './modules/users/users.module'
import { AppService } from './app.service'
import { AuthGateway } from './app-gateways/auth.gateway'
import { MessagesModule } from './modules/messages/messages.module'
import { ChatsModule } from './modules/chats/chats.module'
import { ContactsGateway } from './app-gateways/contacts.gateway'

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
    providers: [AppService, AuthGateway, ContactsGateway],
})
export class AppModule {}
