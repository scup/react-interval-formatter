const chai = require('chai')
const chaiEnzyme = require('chai-enzyme')
const jsdom = require('jsdom')

chai.use(chaiEnzyme())

// ============================================================================
// Mocking DOM
// ============================================================================
const doc = jsdom.jsdom(`
    <!doctype html>
    <html>
        <body></body>
    </html>
`)

const win = doc.defaultView

Object.assign(global, {
  document: doc,
  window: win,
  Element: win.Element
})

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})
