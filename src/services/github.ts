import {
  GitHubClient,
  GitHubUser,
  GitHubUserResponse,
} from '@src/clients/github'

export class GitHubService {
  constructor(protected client = new GitHubClient()) {}

  public async getUser(userId: string): Promise<GitHubUser> {
    const clientUser = await this.client.getUser(userId)
    return this.normalizeGitHubUser(clientUser)
  }

  private normalizeGitHubUser(data: GitHubUserResponse): GitHubUser {
    const {
      login,
      id,
      avatar_url,
      html_url,
      name,
      company,
      blog,
      location,
      email,
      followers,
      following,
    } = data
    return {
      login,
      id,
      name,
      company,
      blog,
      location,
      email,
      followers,
      following,
      avatar: avatar_url,
      url: html_url,
      repos: [],
    }
  }
}
