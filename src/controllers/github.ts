import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { GitHubService } from '@src/services/github'

interface GetGitHubUserParams {
  id: string
}

@Controller('github')
export class GitHubController {
  constructor(protected service = new GitHubService()) {}

  @Get('users/:id')
  public async getGitHubUser(req: Request<GetGitHubUserParams>, res: Response) {
    const user = await this.service.getUser(req.params.id)
    res.send(user)
  }
}
