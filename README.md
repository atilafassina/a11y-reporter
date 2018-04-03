<div align="center">

![A11y-Reporter](https://raw.githubusercontent.com/atilafassina/a11y-auditor/master/a11yreporter.png)

[![Build Status](https://travis-ci.org/atilafassina/a11y-auditor.svg?branch=master)](https://travis-ci.org/atilafassina/a11y-auditor) [![codecov](https://codecov.io/gh/atilafassina/a11y-auditor/branch/master/graph/badge.svg)](https://codecov.io/gh/atilafassina/a11y-auditor) ![David](https://img.shields.io/david/atilafassina/a11y-auditor.svg)

a microservice wrapper around [Pa11y](https://github.com/pa11y/pa11y) and [Outline-Audit](https://github.com/edenspiekermann/outline-audit) for reports on semantics and accessibility.

</div>

## usage 📡

A11y-Reporter accepts only `POST` requests, with 2 keys in the `body`:

* `url`: the absolute url of the page it is intended to test
* `filterList`: the array of codes you intend to check for (check all possible codes at [Pa11y wiki](https://github.com/pa11y/pa11y/wiki/HTML-CodeSniffer-Rules))

<details>
<summary>example</summary>

```jsx
const a11yReport = async () => {
  const response = await fetch('https://your-a11y-audit-instance.now.sh', {
    url: 'https://atila.fassina.eu',
    filterList: [
      'WCAG2AA.Principle1.Guideline1_1.1_1_1.H37',
      'WCAG2AA.Principle1.Guideline1_1.1_1_1.H30.2',
      'WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image'
    ]
  })

  return response.json()
}
```

</details>

## creating your own instance 🛰

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/atilafassina/a11y-auditor?docker=true)

Alternatively, you can also clone this repository and deploy it to the PAAS of your choice 😉
