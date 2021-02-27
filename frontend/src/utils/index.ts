import IChat from '@/interfaces/chat'
import IUser from '@/interfaces/user'

export const getUserFromChat= (ownId: string, chat: IChat): IUser => {
    const { users } = chat
    return ownId !== users[0]._id ? users[0]: users[1]
}