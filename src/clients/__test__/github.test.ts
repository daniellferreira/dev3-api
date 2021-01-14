import { GitHubClient, GitHubUserResponse } from '@src/clients/github'
import axios from 'axios'
import githubValidUserMock from '@test/mocks/github_valid_user.json'

jest.mock('axios')

describe('GitHub client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('should return the non-normalized user from GitHub', async () => {
    const user = 'daniellferreira'

    mockedAxios.get.mockResolvedValue({ data: githubValidUserMock })

    const githubClient = new GitHubClient(mockedAxios)
    const response = await githubClient.getUser(user)
    expect(response).toEqual(githubValidUserMock)
  })
})
