import { CreateUserDto } from '../modules/users/dto/create-user.dto'
import { User } from '../modules/users/interfaces/user.interface'

export default function getBotsEntities(): CreateUserDto[] {
    return [
        {
            username: 'Reverse Bot',
            imageUrl: '/reverse_bot.png',
            role: 'bot'
        },
        {
            username: 'Echo Bot',
            imageUrl: '/echo_bot.png',
            role: 'bot'
        },
        {
            username: 'Spam Bot',
            imageUrl: '/spam_bot.png',
            role: 'bot'
        },
        {
            username: 'Ignore Bot',
            imageUrl: '/ignore_bot.png',
            role: 'bot'
        }
    ]
}

