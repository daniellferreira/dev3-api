import { GitHubClient, GitHubUserResponse } from '@src/clients/github'
import { GitHubService } from '@src/services/github'
import githubValidUserMock from '@test/mocks/github_valid_user.json'
import githubNormalizedValidUserMock from '@test/mocks/github_normalized_valid_user.json'

jest.mock('@src/clients/github')

describe('GitHub service', () => {
  const mockedClient = new GitHubClient() as jest.Mocked<GitHubClient>
  it('should return the normalized user from GitHub', async () => {
    mockedClient.getUser.mockResolvedValue(
      (githubValidUserMock as unknown) as GitHubUserResponse
    )

    const service = new GitHubService(mockedClient)
    const normalizedUser = await service.getUser('')

    expect(normalizedUser).toEqual(githubNormalizedValidUserMock)
  })
})
