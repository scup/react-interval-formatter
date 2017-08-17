import React, { Component } from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash.omit'

import IntervalFormatterPresenter from './IntervalFormatterPresenter'
import FormatterEmitter from './FormatterEmitter'

class IntervalFormatter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formattedValue: null
    }

    this.updateFormattedValue = this.updateFormattedValue.bind(this)
  }

  updateFormattedValue (formattedValue) {
    this.setState({ formattedValue })
  }

  componentDidMount () {
    this.subscribe(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const { formatter, value } = nextProps
    this.unsubscribe()

    this.subscribe(nextProps)
    this.updateFormattedValue(formatter(value))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { formattedValue } = this.state
    const otherProps = omit(this.props, Object.keys(IntervalFormatter.propTypes))

    return <IntervalFormatterPresenter value={formattedValue} {...otherProps} />
  }

  subscribe (props) {
    if (!this.unsubscriber) {
      const { formatter, value } = props

      this.unsubscriber = FormatterEmitter.register({
        callback: this.updateFormattedValue,
        formatter,
        value
      })
    }
  }

  unsubscribe () {
    this.unsubscriber && this.unsubscriber()
    this.unsubscriber = null
  }
}

IntervalFormatter.propTypes = {
  formatter: PropTypes.func,
  value: PropTypes.any
}

export default IntervalFormatter
