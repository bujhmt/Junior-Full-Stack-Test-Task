import * as mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sent: { type: Date, default: new Date() },
    owner: { type: mongoose.Types.ObjectId, ref: 'User' },
    chat: { type: mongoose.Types.ObjectId, ref: 'Chat' },
    isRead: { type: Boolean, default: false },
})
