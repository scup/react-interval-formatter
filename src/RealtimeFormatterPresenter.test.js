import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import RealtimeFormatterPresenter from 'RealtimeFormatterPresenter'

describe('RealtimeFormatterPresenter', () => {
  it('renders a span by default', () => {
    const wrapper = mount(<RealtimeFormatterPresenter />)

    expect(wrapper).to.have.html('<span data-reactroot=""></span>')
  })

  it('renders a div', () => {
    const wrapper = mount(<RealtimeFormatterPresenter tag='div' />)

    expect(wrapper).to.have.html('<div data-reactroot=""></div>')
  })

  it('renders a span and the value', () => {
    const wrapper = mount(<RealtimeFormatterPresenter tag='span' value='the value' />)

    expect(wrapper).to.have.html('<span data-reactroot="">the value</span>')
  })

  it('renders other props', () => {
    const callback = sinon.spy()
    const wrapper = mount(<RealtimeFormatterPresenter tag='span' value='the value' onClick={callback} className='className' />)

    wrapper.simulate('click')
    expect(callback.calledOnce).to.be.true
    expect(wrapper).to.have.html('<span data-reactroot="" class="className">the value</span>')
  })
})
