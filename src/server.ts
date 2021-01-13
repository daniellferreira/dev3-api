import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import { Application } from 'express'
import { TestController } from './controllers/test'
import './util/module-alias'

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super()
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json())
  }

  private setupControllers(): void {
    const testController = new TestController()
    this.addControllers([testController])
  }

  public init(): void {
    this.setupExpress()
    this.setupControllers()
  }

  public getApp(): Application {
    return this.app
  }
}
