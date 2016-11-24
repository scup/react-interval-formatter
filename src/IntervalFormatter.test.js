import sinon from 'sinon'

import IntervalFormatter from 'IntervalFormatter'

describe('IntervalFormatter', () => {
  let callback
  let clock
  let differentFormatter
  let sameFormatter

  beforeEach(() => {
    const now = new Date(1987, 6, 12, 1, 20)
    clock = sinon.useFakeTimers(now.getTime())

    callback = sinon.spy()

    differentFormatter = sinon.stub()
    differentFormatter
      .withArgs('any value')
      .onFirstCall().returns('formatted 1')
      .onSecondCall().returns('formatted 2')
      .onThirdCall().returns('formatted 3')

    sameFormatter = sinon.stub()
      .withArgs('any value')
      .returns('formatted equal')
  })

  afterEach(() => clock.restore())

  it('calls the callback with my formatter when I register', () => {
    const unsubscriber = IntervalFormatter.register({
      value: 'any value',
      formatter: differentFormatter,
      callback
    })

    sinon.assert.calledOnce(callback)
    sinon.assert.calledWith(callback, 'formatted 1')
    unsubscriber()
  })

  it('calls the formatter thice after 30 seconds', () => {
    const unsubscriber = IntervalFormatter.register({
      value: 'any value',
      formatter: differentFormatter,
      callback
    })
    sinon.assert.calledOnce(callback)

    clock.tick(15000)
    sinon.assert.calledTwice(callback)
    sinon.assert.calledWith(callback, 'formatted 2')

    clock.tick(15000)
    sinon.assert.calledThrice(callback)
    sinon.assert.calledWith(callback, 'formatted 3')
    unsubscriber()
  })

  it('does calls the formatter after 15 seconds with the same result', () => {
    const unsubscriber = IntervalFormatter.register({
      value: 'any value',
      formatter: sameFormatter,
      callback
    })

    clock.tick(15000)
    sinon.assert.calledOnce(callback)
    unsubscriber()
  })

  it('does calls the formatter after 15 seconds if it is unscribed', () => {
    const unsubscriber = IntervalFormatter.register({
      value: 'any value',
      formatter: differentFormatter,
      callback
    })
    unsubscriber()

    clock.tick(15000)
    sinon.assert.calledOnce(callback)
  })

  describe('with more than 1 subscription', () => {
    it('calls the callback when let 1 subscription active', () => {
      const unsubscriber = IntervalFormatter.register({
        value: 'any value',
        formatter: differentFormatter,
        callback
      })

      unsubscriber()
      const unsubscriber2 = IntervalFormatter.register({
        value: 'any value',
        formatter: differentFormatter,
        callback
      })

      clock.tick(15000)
      sinon.assert.calledThrice(callback)
      unsubscriber2()
    })

    it('clears interval when there is no subscribers', () => {
      const dependencies = {
        window: {
          setInterval: sinon.stub()
            .withArgs(sinon.match.func, 15000)
            .returns('interval'),

          clearInterval: sinon.spy()
        }
      }

      const unsubscriber1 = IntervalFormatter.register({
        value: 'any value',
        formatter: differentFormatter,
        callback
      }, dependencies)

      const unsubscriber2 = IntervalFormatter.register({
        value: 'any value',
        formatter: differentFormatter,
        callback
      }, dependencies)

      unsubscriber1()
      unsubscriber2()

      sinon.assert.calledOnce(dependencies.window.clearInterval)
      sinon.assert.calledWith(dependencies.window.clearInterval, 'interval')
    })
  })
})
