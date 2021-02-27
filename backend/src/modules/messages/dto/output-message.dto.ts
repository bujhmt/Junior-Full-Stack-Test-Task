import { User } from '../../users/interfaces/user.interface'

export default interface OutputMessageDto {
    text: string
    owner: User
    addressee: User
}
