import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import * as HTTPRequest from '@src/util/request'

@Controller('github')
export class TestController {
  @Get('users/:id')
  public getGitHubUser(_: Request, res: Response): void {
    res.send({ success: true, hello: 'world' })
  }
}
