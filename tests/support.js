import jsdom from 'jsdom'

global.document = jsdom.jsdom(`
    <!doctype html>
    <html>
        <body></body>
    </html>
`)

global.window = document.defaultView
global.navigator = {
  userAgent: 'node.js'
}

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

const chai = require('chai')
const chaiEnzyme = require('chai-enzyme')
chai.use(chaiEnzyme())
