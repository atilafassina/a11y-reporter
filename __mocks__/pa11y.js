const sampleIssue = require('./sampleIssue.js')

module.exports = () => ({
  documentTitle: 'mock report',
  pageUrl: 'https://foo.bar',
  issues: [sampleIssue]
})
