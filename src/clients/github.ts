import config, { IConfig } from 'config'
import { Request } from '@src/lib/request'

export interface GitHubUserResponse {
  readonly login: string
  readonly id: number
  readonly node_id: string
  readonly avatar_url: string
  readonly gravatar_id: string
  readonly url: string
  readonly html_url: string
  readonly followers_url: string
  readonly following_url: string
  readonly gists_url: string
  readonly starred_url: string
  readonly subscriptions_url: string
  readonly organizations_url: string
  readonly repos_url: string
  readonly events_url: string
  readonly received_events_url: string
  readonly type: string
  readonly site_admin: boolean
  readonly name?: string
  readonly company?: string
  readonly blog: string
  readonly location?: string
  readonly email?: string
  readonly hireable?: string
  readonly bio?: string
  readonly twitter_username?: string
  readonly public_repos: number
  readonly public_gists: number
  readonly followers: number
  readonly following: number
  readonly created_at: Date
  readonly updated_at: Date
}

const githubConfig: IConfig = config.get('App.resources.github')

export class GitHubClient {
  constructor(protected request: Request = new Request()) {}

  public async getUser(user: string): Promise<GitHubUserResponse> {
    const response = await this.request.get<GitHubUserResponse>(
      githubConfig.get('baseUrl') + '/users/' + user
    )
    return response.data
  }
}
