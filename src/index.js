const { send, json } = require('micro')
const utils = require('./utils')

const a11yAuditor = async (req, res) => {
  if (req.method !== 'POST') {
    send(res, 400, 'Sorry, only POST requests allowed')
    return
  }

  const data = await json(req)
  const report = await utils.getReport(data)

  if (report.type === 'error') {
    send(res, 400, report)
    return
  }

  send(res, 200, report)
}

module.exports = a11yAuditor
