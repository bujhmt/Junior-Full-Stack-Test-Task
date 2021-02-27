import IUser from './user'
import IChat from './chat'

export default interface IMessage {
    _id: string
    text: string
    sent: Date
    owner: IUser
    chat: IChat
    isRead: boolean
}