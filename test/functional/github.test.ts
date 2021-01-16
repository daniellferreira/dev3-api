import githubValidUserMock from '@test/mocks/github_valid_user.json'
import githubNormalizedValidUserMock from '@test/mocks/github_normalized_valid_user.json'
import axios from 'axios'

jest.mock('axios')

describe.skip('GitHub test', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('should return a valid GitHub user', async () => {
    mockedAxios.get.mockResolvedValue({ data: githubValidUserMock })

    const { body, status } = await global.testRequest.get(
      '/github/users/daniellferreira'
    )

    expect(status).toBe(200)
    expect(body).toEqual(githubNormalizedValidUserMock)
  })
})
