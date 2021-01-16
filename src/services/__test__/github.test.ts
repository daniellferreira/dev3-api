import { GitHubUserResponse } from '@src/clients/github'
import { GitHubService } from '@src/services/github'
import githubValidUserMock from '@test/mocks/github_valid_user.json'
import githubNormalizedValidUserMock from '@test/mocks/github_normalized_valid_user.json'

describe('GitHub service', () => {
  it('should return the normalized user from GitHub', async () => {
    const normalizedUser = GitHubService.normalizeGitHubUser(
      (githubValidUserMock as unknown) as GitHubUserResponse
    )
    expect(normalizedUser).toEqual(githubNormalizedValidUserMock)
  })
})
