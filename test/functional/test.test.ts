import supertest from 'supertest'

describe('Test of the test', () => {
  it('should return success from an api call', async () => {
    const { body, status } = await global.testRequest.get('/test')

    expect(status).toBe(200)
    expect(body).toEqual({ success: true, hello: 'world' })
  })
})
