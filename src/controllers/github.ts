import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { GitHubClient } from '@src/clients/github'
import { GitHubService } from '@src/services/github'

interface GetGitHubUserParams {
  id: string
}

@Controller('github')
export class GitHubController {
  constructor(protected githubClient = new GitHubClient()) {}

  @Get('users/:id')
  public async getGitHubUser(req: Request<GetGitHubUserParams>, res: Response) {
    const clientUser = await this.githubClient.getUser(req.params.id)
    res.send(GitHubService.normalizeGitHubUser(clientUser))
  }
}
