import { Document } from 'mongoose'
import { User } from '../../users/interfaces/user.interface'
import { Chat } from '../../chats/interfaces/chat.interface'

export interface Message extends Document {
    text: string
    sent: Date
    owner: User
    chat: Chat
    isRead: Boolean
}
