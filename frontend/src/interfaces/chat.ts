import IUser from '@/interfaces/user'
import IMessage from '@/interfaces/message'

export default interface IChat {
    user: IUser
    messages: IMessage[]
}