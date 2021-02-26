import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './core/database/database.module'
import { UsersModule } from './modules/users/users.module'
import { AppService } from './app.service'
import { AppGateway } from './app.gateway'
import { UsersGateway } from './modules/users/users.gateway'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
    ],
    providers: [AppService, AppGateway, UsersGateway],
})
export class AppModule {}
