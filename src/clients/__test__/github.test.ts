import { GitHub } from '@src/clients/github'
import axios from 'axios'
import githubValidUserMock from '@test/mocks/github_valid_user.json'
import githubNormalizedValidUserMock from '@test/mocks/github_normalized_valid_user.json'

jest.mock('axios')

describe('GitHub client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  it('should return the normalized user from the GitHub service', async () => {
    const user = 'daniellferreira'

    mockedAxios.get.mockResolvedValue({ data: githubValidUserMock })

    const github = new GitHub(mockedAxios)
    const response = await github.getUser(user)
    expect(response).toEqual(githubNormalizedValidUserMock)
  })
})
