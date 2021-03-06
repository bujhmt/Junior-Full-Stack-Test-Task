import { Model } from 'mongoose'
import { sign, verify } from 'jsonwebtoken'
import { Injectable, Inject } from '@nestjs/common'
import { User } from './interfaces/user.interface'
import { USER_MODEL } from '../../core/constants'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_MODEL)
        private userModel: Model<User>,
    ) {}

    public async findById(userId: string): Promise<User> {
        const matched: User = await this.userModel.findOne({ _id: userId })
        if (!matched) throw new Error(`User with ${userId} id not found`)
        return matched
    }

    async login(token: string, connectionId: string): Promise<User> {
        const decoded: any = verify(token, process.env.TOKEN_SECRET)
        const userId: string = decoded._id

        const matched: User = await this.findById(userId)

        matched.currentConnectionId = connectionId
        matched.isOnline = true

        return await matched.save()
    }

    async logout(userId: string): Promise<User> {
        const user: User = await this.findById(userId)
        user.isOnline = false
        user.lastSeen = new Date()
        return await user.save()
    }

    async signUp(createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
        const newUser = new this.userModel(createUserDto)
        const savedUser = await newUser.save()
        const token = sign({ _id: savedUser._id }, process.env.TOKEN_SECRET)
        return { user: savedUser, token }
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.userModel.updateOne({ _id: userId }, updateUserDto).exec()
    }

    async getAllWithoutOwn(userId: string): Promise<User[]> {
        const candidates = await this.userModel.find({}).sort({ isOnline: -1}).sort({lastSeen: -1})
        return candidates.filter((candidate) => candidate._id != userId)
    }

    async deleteBots(): Promise<void> {
        await this.userModel.deleteMany({role: 'bot'})
    }

    async findByUsername(username: string): Promise<User> {
        return (await this.userModel.find({username}))[0]
    }
}
