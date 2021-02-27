import { Connection } from 'mongoose'
import { MessageSchema } from './schemas/message.shema'
import { MESSAGE_MODEL, DATABASE_CONNECTION } from '../../core/constants'

export const messagesProviders = [
    {
        provide: MESSAGE_MODEL,
        useFactory: (connection: Connection) => connection.model('Message', MessageSchema),
        inject: [DATABASE_CONNECTION],
    },
]
