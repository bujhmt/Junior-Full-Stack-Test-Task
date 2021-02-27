import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'
import { DatabaseModule } from '../../core/database/database.module'
import { UsersGateway } from './users.gateway'

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...usersProviders, UsersGateway],
    exports: [UsersService],
})
export class UsersModule {}
