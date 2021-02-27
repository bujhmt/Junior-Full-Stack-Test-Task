import { Document } from 'mongoose'
import { User } from '../../users/interfaces/user.interface'

export interface Message extends Document {
    text: string
    sent: Date
    owner: User
    addressee: User
    isRead: boolean
}
