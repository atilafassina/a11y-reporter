import test from 'ava'
import { filterIssues } from '../src/index'

test('`filterIssues` should return empty array when no input is provided', t => {
  const actual = filterIssues()
  t.pass(actual, [])
})
