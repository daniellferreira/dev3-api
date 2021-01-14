import axios, { AxiosResponse, AxiosStatic } from 'axios'
import config, { IConfig } from 'config'
import { GitHubService } from '@src/services/github'

const githubConfig: IConfig = config.get('App.resources.github')

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

export interface GitHubUser {
  login: string
  id: number
  avatar: string
  url: string
  repos: Repository[]
  name?: string
  company?: string
  blog: string
  location?: any
  email?: string
  followers: number
  following: number
}

interface Repository {
  name: string
  url: string
  description?: string
}

export class GitHubClient {
  constructor(protected request: AxiosStatic = axios) {}

  public async getUser(user: string): Promise<GitHubUserResponse> {
    const response = await this.request.get<GitHubUserResponse>(
      githubConfig.get('baseUrl') + '/users/' + user
    )
    return response.data
  }
}
