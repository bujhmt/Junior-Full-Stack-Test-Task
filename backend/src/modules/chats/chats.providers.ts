import { Connection } from 'mongoose'
import { ChatSchema } from './schemas/chat.schema'
import { CHAT_MODEL, DATABASE_CONNECTION } from '../../core/constants'

export const chatsProviders = [
    {
        provide: CHAT_MODEL,
        useFactory: (connection: Connection) => connection.model('Chat', ChatSchema),
        inject: [DATABASE_CONNECTION],
    },
]
