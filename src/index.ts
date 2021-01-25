import { SetupServer } from './server'

import config, { IConfig } from 'config'
const appConfig: IConfig = config.get('App')

;(async (): Promise<void> => {
  const server = new SetupServer(appConfig.get('port'))
  await server.init()
  server.start()
})()
