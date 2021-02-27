import { Inject, Injectable } from '@nestjs/common'
import { MESSAGE_MODEL } from '../../core/constants'
import { Model } from 'mongoose'
import { Message } from './interfaces/message.interface'

@Injectable()
export class MessagesService {
    constructor(
        @Inject(MESSAGE_MODEL)
        private messageModel: Model<Message>,
    ) {}
}
