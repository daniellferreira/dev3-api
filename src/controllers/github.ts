import { Controller, Get, Post } from '@overnightjs/core'
import { NextFunction, Request, Response } from 'express'
import { GitHubService } from '@src/services/github'
import { GitHubUser } from '@src/models/githubuser'

interface GetGitHubUserParams {
  id: string
}

@Controller('github')
export class GitHubController {
  constructor(protected service = new GitHubService()) {}

  @Get('users/:id')
  public async getGitHubUser(req: Request<GetGitHubUserParams>, res: Response) {
    const user = await this.service.getUser(req.params.id)
    res.json(user)
  }

  @Post('users')
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.createUser(req.body)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  }
}
