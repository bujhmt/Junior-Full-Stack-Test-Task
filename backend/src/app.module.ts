import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './core/database/database.module'
import { UsersModule } from './modules/users/users.module'
import { AppService } from './app.service'
import { AuthGateway } from './app-gateways/auth.gateway'
import { MessagesModule } from './modules/messages/messages.module'
import { ContactsGateway } from './app-gateways/contacts.gateway'
import { MessagesGateway } from './app-gateways/messages.gateway'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
        MessagesModule,
    ],
    providers: [AppService, AuthGateway, ContactsGateway, MessagesGateway],
})
export class AppModule {}
