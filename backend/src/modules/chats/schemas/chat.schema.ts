import * as mongoose from 'mongoose'

export const ChatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
})
