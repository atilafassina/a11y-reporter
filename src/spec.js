require('isomorphic-fetch')
const micro = require('micro')
const listen = require('test-listen')
const a11yAuditor = require('../src')

it('should return a 400 when request not POST', async () => {
  expect.assertions(1)
  const service = micro(a11yAuditor)
  const mockServerUrl = await listen(service)
  const response = await fetch(mockServerUrl)

  expect(response.status).toEqual(400)
  service.close()
})

it('should return a 400 when test url is not found', async () => {
  expect.assertions(1)
  const testUrl = 'http://foo.bar/baz'

  const service = micro(a11yAuditor)
  const mockServerUrl = await listen(service)
  const response = await fetch(mockServerUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      url: testUrl
    })
  })

  expect(response.status).toEqual(400)
  service.close()
})

it('should return a 200 when test url works', async () => {
  expect.assertions(1)
  global.fetch = () => ({ status: 200 })
  const testUrl = 'https://foo.bar'

  const service = micro(a11yAuditor)
  const mockServerUrl = await listen(service)
  const response = await fetch(mockServerUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      url: testUrl
    })
  })

  expect(response.status).toEqual(200)
  service.close()
})
