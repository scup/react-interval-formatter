import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import FormatterEmitter from 'FormatterEmitter'
import IntervalFormatter from 'IntervalFormatter'

describe('IntervalFormatter', () => {
  it('renders the formatted value', () => {
    const formatter = sinon.stub()
      .withArgs('value')
      .returns('really formatted')

    const wrapper = mount(<IntervalFormatter value='value' formatter={formatter} />)
    expect(wrapper).to.have.html('<span data-reactroot="">really formatted</span>')
  })

  it('renders the formatted value', () => {
    const formatter = sinon.stub()
      .withArgs('value')
      .returns('really formatted')

    const wrapper = mount(<IntervalFormatter value='value' formatter={formatter} />)
    expect(wrapper).to.have.html('<span data-reactroot="">really formatted</span>')
  })

  it('calls the unsubscriber from IntervalFormatter.register on unmount', () => {
    const formatter = sinon.stub()

    const unsubscriber = sinon.spy()

    const registerStub = sinon.stub(FormatterEmitter, 'register')
    registerStub
      .withArgs({
        value: 'value',
        formatter,
        callback: sinon.match.func
      })
      .returns(unsubscriber)

    const wrapper = mount(<IntervalFormatter value='value' formatter={formatter} />)
    wrapper.unmount()
    sinon.assert.calledOnce(unsubscriber)
    FormatterEmitter.register.restore()
  })
})
