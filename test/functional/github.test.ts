import githubValidUserMock from '@test/mocks/github_valid_user.json'
import githubNormalizedValidUserMock from '@test/mocks/github_normalized_valid_user.json'
import nock from 'nock'
import { GitHubUser } from '@src/models/githubuser'

describe('GitHub test', () => {
  it('should return a valid GitHub user', async () => {
    const user = 'daniellferreira'

    nock('https://api.github.com:443', {
      encodedQueryParams: true,
      reqheaders: {
        'User-Agent': 'dev3-api',
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(`/users/${user}`)
      .reply(200, githubValidUserMock)

    const { body, status } = await global.testRequest.get(
      `/github/users/${user}`
    )

    expect(status).toBe(200)
    expect(body).toEqual(githubNormalizedValidUserMock)
  })

  describe('DB Operations', () => {
    beforeAll(async () => {
      await GitHubUser.deleteMany()
    })
    describe('When creating a user', () => {
      it('should create a user with success', async () => {
        const newUser = {
          login: 'daniellferreira',
          githubId: 30799460,
          avatar: 'https://avatars3.githubusercontent.com/u/30799460?v=4',
          url: 'https://github.com/daniellferreira',
          repos: [],
          name: 'Daniel Lopes Ferreira',
          company: 'Mercado Pago',
          blog: '',
          location: null,
          email: 'daniel.lopes.ferreira98@gmail.com',
          followers: 2,
          following: 2,
        }

        const response = await global.testRequest
          .post('/github/users')
          .send(newUser)
        expect(response.status).toBe(201)
        expect(response.body).toEqual(expect.objectContaining(newUser))
      })

      it('should return 422 when there is a validation error', async () => {
        const newUser = {
          githubId: 30799460,
          avatar: 'https://avatars3.githubusercontent.com/u/30799460?v=4',
          url: 'https://github.com/daniellferreira',
          repos: [],
          name: 'Daniel Lopes Ferreira',
          company: 'Mercado Pago',
          blog: '',
          location: null,
          email: 'daniel.lopes.ferreira98@gmail.com',
          followers: 2,
          following: 2,
        }

        const expectedResponse = {
          message: 'There are validation errors',
          cause: 'VALIDATION_ERROR',
          errors: {
            login: 'Required field',
          },
        }

        const response = await global.testRequest
          .post('/github/users')
          .send(newUser)

        expect(response.status).toBe(422)
        expect(response.body).toEqual(expectedResponse)
      })
    })
  })
})
