import { Document } from 'mongoose'

export interface User extends Document {
    username?: string
    isOnline: boolean
    lastSeen: Date
    imageUrl: string
    currentConnectionId?: string
}
