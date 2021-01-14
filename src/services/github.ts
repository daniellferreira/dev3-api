import { GitHubUser, GitHubUserResponse } from '@src/clients/github'

export class GitHubService {
  public static normalizeGitHubUser(data: GitHubUserResponse): GitHubUser {
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
