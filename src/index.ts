//example of using config file
import config, { IConfig } from 'config'
const dbConfig: IConfig = config.get('App.db')
console.log(dbConfig.get('connectionString'))

console.log('hello src')
