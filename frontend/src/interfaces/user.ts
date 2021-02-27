export interface IUser {
    _id: string
    username?: string,
    isOnline: boolean
    lastSeen: Date
    imageUrl: string
}