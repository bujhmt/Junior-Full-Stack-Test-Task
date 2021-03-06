import { User } from '../../users/interfaces/user.interface'

export default interface CreateMessageDto {
    text: string
    owner: User
    addressee: User
}
