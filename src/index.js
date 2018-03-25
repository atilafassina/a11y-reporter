const pa11y = require('pa11y')
const { send, json } = require('micro')
const outline = require('./outline')

const filterIssues = (pa11y = [], semantics = [], issueFilter) => {
  const a11yIssues = Array.isArray(issueFilter)
    ? pa11y.filter(issue => issueFilter.includes(issue.code))
    : pa11y

  return [...a11yIssues, ...semantics]
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    send(res, 400, 'Sorry, only POST requests allowed')
    return
  }

  const data = await json(req)

  const a11yReport = await pa11y(data.url, {})
  const semantics = await outline(data.url, {})
  const reportIssues = filterIssues(a11yReport.issues, semantics, data.filter)

  const report = {
    documentTitle: a11yReport.documentTitle,
    pageUrl: a11yReport.pageUrl,
    date: new Date().toISOString(),
    issues: reportIssues
  }

  send(res, 200, report)
}

module.exports.filterIssues = filterIssues
