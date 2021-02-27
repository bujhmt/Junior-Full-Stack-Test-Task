import IUser from '@/interfaces/user'

export default interface IContact {
    user: IUser,
    lastMsg?: string
}