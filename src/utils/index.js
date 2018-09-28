const uniq = require('lodash/uniq')
const pa11y = require('pa11y')
const outline = require('../outline')

const filterIssues = (pa11y = [], semantics = [], issueFilter) => {
  const a11yIssues = Array.isArray(issueFilter)
    ? pa11y.filter(issue => issueFilter.includes(issue.code))
    : pa11y

  return uniq([...a11yIssues, ...semantics])
}

const getReport = async ({ url, filterList = [] }) => {
  try {
    const a11yReport = await pa11y(url)
    const semantics = await outline(url, {})
    const reportIssues = filterIssues(a11yReport.issues, semantics, filterList)

    return {
      documentTitle: a11yReport.documentTitle,
      pageUrl: a11yReport.pageUrl,
      date: new Date().toISOString(),
      issues: reportIssues
    }
  } catch (error) {
    error.type = 'error'
    return error
  }
}

module.exports = {
  _filterIssues: filterIssues,
  getReport
}
