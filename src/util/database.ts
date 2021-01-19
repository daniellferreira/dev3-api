import config, { IConfig } from 'config'
import mongoose, { Mongoose } from 'mongoose'

const dbConfig: IConfig = config.get('App.db')

export const connect = async (): Promise<Mongoose> => {
  return await mongoose.connect(dbConfig.get('connectionString'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export const close = (): Promise<void> => mongoose.connection.close()
