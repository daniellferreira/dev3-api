import fs from 'fs'
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import { Application } from 'express'
import './util/module-alias'

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super()
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json())
  }

  private async setupControllers(): Promise<void> {
    let controllers = fs.readdirSync('./src/controllers')

    controllers = controllers
      .filter((ctr) => !ctr.startsWith('__') && ctr.endsWith('.ts'))
      .map((ctr) => ctr.replace('.ts', ''))

    for (const controller of controllers) {
      const controllerFile = await import(`@src/controllers/${controller}`)

      Object.keys(controllerFile)
        .filter((elem) => elem.includes('Controller'))
        .forEach((controllerName) => {
          this.addControllers(new controllerFile[controllerName]())
        })
    }
  }

  private setupServer(): void {
    this.app.listen(this.port, () => {
      console.info(`Server running on PID ${process.pid} port ${this.port}`)
    })
  }

  public async init(): Promise<void> {
    this.setupExpress()
    await this.setupControllers()
    this.setupServer()
  }

  public getApp(): Application {
    return this.app
  }
}
