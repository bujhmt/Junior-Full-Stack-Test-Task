import { Document } from 'mongoose'
import { User } from '../../users/interfaces/user.interface'
import { Message } from '../../messages/interfaces/message.interface'

export interface Chat extends Document {
    users: User[]
    messages: Message[]
}
