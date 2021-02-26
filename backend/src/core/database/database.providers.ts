import * as mongoose from 'mongoose'
import { DATABASE_CONNECTION } from '../constants'
import * as dotenv from 'dotenv'

dotenv.config()

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            }),
    },
]
