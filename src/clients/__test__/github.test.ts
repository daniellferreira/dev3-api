import { GitHubClient } from '@src/clients/github'
import githubValidUserMock from '@test/mocks/github_valid_user.json'
import { Request, Response } from '@src/lib/request'

jest.mock('@src/lib/request')

describe('GitHub client', () => {
  const mockedRequest = new Request() as jest.Mocked<Request>

  it('should return the non-normalized user from GitHub', async () => {
    const user = 'daniellferreira'

    mockedRequest.get.mockResolvedValue({
      data: githubValidUserMock,
    } as Response)

    const githubClient = new GitHubClient(mockedRequest)
    const response = await githubClient.getUser(user)
    expect(response).toEqual(githubValidUserMock)
  })
})
