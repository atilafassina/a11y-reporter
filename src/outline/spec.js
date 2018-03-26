const outline = require('./')

it('should just work', async () => {
  global.fetch = () => {
    return {
      text: () => Promise.resolve('<h2>foo</h2>')
    }
  }
  expect.assertions(1)
  const audit = await outline('https://foo.bar.eu', {})
  expect(audit.length).toEqual(1)
})
