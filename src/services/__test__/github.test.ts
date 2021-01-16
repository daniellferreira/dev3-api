import { GitHubClient, GitHubUserResponse } from '@src/clients/github'
import { GitHubService } from '@src/services/github'
import githubValidUserMock from '@test/mocks/github_valid_user.json'
import githubNormalizedValidUserMock from '@test/mocks/github_normalized_valid_user.json'
import { Request, Response } from '@src/lib/request'

jest.mock('@src/lib/request')

describe('GitHub service', () => {
  const mockedRequest = new Request() as jest.Mocked<Request>
  it('should return the normalized user from GitHub', async () => {
    mockedRequest.get.mockResolvedValue({
      data: githubValidUserMock,
    } as Response)

    const mockedClient = new GitHubClient(mockedRequest)
    const service = new GitHubService(mockedClient)

    const normalizedUser = await service.getUser('')

    expect(normalizedUser).toEqual(githubNormalizedValidUserMock)
  })
})
