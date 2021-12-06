import mongoose from 'mongoose'

export const connectDB = (uri:string):Promise<typeof mongoose> => {
    return mongoose.connect(uri)
}