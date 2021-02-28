import * as mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sent: { type: Date, default: Date.now },
    owner: { type: mongoose.Types.ObjectId, ref: 'User' },
    addressee: { type: mongoose.Types.ObjectId, ref: 'User' },
    isRead: { type: Boolean, default: false },
})
