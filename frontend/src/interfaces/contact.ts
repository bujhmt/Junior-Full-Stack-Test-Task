import IUser from '@/interfaces/user'
import IMessage from '@/interfaces/message'

export default interface IContact {
    user: IUser,
    lastMsg?: IMessage
}