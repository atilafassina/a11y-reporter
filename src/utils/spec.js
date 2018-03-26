const utils = require('./')
const root = '../../'
const pa11yReport = require(`${root}/__mocks__/pa11y.js`)()
const outlineReport = require(`${root}__mocks__/outline.js`)()

it('`filterIssues` should return empty array when no input is provided', () => {
  const actual = utils._filterIssues()
  expect(actual).toEqual([])
})

it('`filterIssues` should return only the issues matching the code provided', () => {
  const actual = utils._filterIssues(pa11yReport.issues, outlineReport.issues, [
    'WCAG2AA.Principle1.Guideline1_1.1_1_1.H37'
  ])
  expect(actual.length).toEqual(1)
})
