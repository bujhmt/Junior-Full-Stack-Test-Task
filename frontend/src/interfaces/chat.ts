import IUser from '@/interfaces/user'
import IMessage from '@/interfaces/message'

export default interface IChat {
    _id: string
    users: IUser[]
    messages: IMessage[]
}