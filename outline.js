/*
 * foked from:
 * https://github.com/edenspiekermann/outline-audit
 * 
*/ 
require('isomorphic-fetch')
const cheerio = require('cheerio')

class Outline {
  constructor ($) {
    this.$ = $
  }
  
  getHeadings () {
    return this.$.root().find('h1, h2, h3, h4, h5, h6')
  }
  
  get (object, path) {
    return path.reduce((prev, curr) => prev[curr], object)
  }
  
  getLevel (node) {
    return parseInt(node.tagName.slice(1), 10)
  }
  
  getSelector (node) {
    const $node = this.$(node)
    const id = $node.attr('id')
    const classes = ($node.attr('class') || '').split(/\s+/).filter(Boolean)
    let selector = node.name || $node.get(0).tagName
  
    if (id) {
      selector += '#' + id
    }
  
    if (classes.length) {
      selector += classes.reduce((selector, c) => selector + '.' + c, '')
    }
  
    return selector
  }
  
  getObjectPath (path) {
    return path.length === 0
      ? path
      : ['children'].concat(path.join('.children.').split('.'))
  }
  
  parse () {
    const outline = { children: [] }
    const currentPath = []
    let lastLevel = 0
  
    this.getHeadings().each((_, heading) => {
      const level = this.getLevel(heading)
      const data = {
        text: this.$(heading).text(),
        level: level,
        node: heading,
        children: []
      }
  
      if (level < lastLevel) {
        for (let i = lastLevel; i >= level; i--) currentPath.pop()
      } else if (level === lastLevel) {
        currentPath.pop()
      }
  
      const prop = this.get(outline, this.getObjectPath(currentPath))
      prop.children.push(data)
      currentPath.push(prop.children.length - 1)
      lastLevel = level
    })
  
    return outline
  }
  
  auditOutline (outline, root) {
    let warnings = []
  
    outline.children.forEach(heading => {
      const selector = this.getSelector(heading.node)
  
      if (root && heading.level !== 1) {
        warnings.push({
          message: `Heading “${heading.text}” is level ${
            heading.level
          } but comes at the root of the document.`,
          selector,
          context: this.$.html(selector)
        })
      } else if (heading.level > outline.level + 1) {
        warnings.push({
          message: `Heading “${heading.text}” is level ${
            heading.level
          } but previous heading was level ${outline.level} (“${outline.text}”).`,
          selector,
          context: this.$.html(selector)
        })
      }
  
      warnings = warnings.concat(this.auditOutline(heading, false))
    })
  
    return warnings
  }
  
  formatForPa11y (warning) {
    return {
      code:
        'https://github.com/edenspiekermann/outline-audit#about-the-document-outline',
      context: warning.context,
      message: warning.message,
      selector: warning.selector,
      type: 'error',
      typeCode: 1
    }
  }
  
  audit () {
    return this.auditOutline(this.parse(), true).map(this.formatForPa11y)
  }
}


const outline = async (url, options) => {
  const response = await fetch(url, { headers: options.headers || {} })
  const html = await response.text()
  const $ = cheerio.load(html)
  const outline = new Outline($)

  return outline.audit()
}

module.exports = outline
