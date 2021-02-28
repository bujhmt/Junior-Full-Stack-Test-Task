import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    isOnline: { type: Boolean, default: true },
    lastSeen: { type: Date, default: Date.now },
    imageUrl: { type: String, default: '/default-avatar.jpg' },
    currentConnectionId: { type: String, required: false },
    role: {type: String, default: 'user'}
})
