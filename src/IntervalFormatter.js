import React, { Component, PropTypes } from 'react'

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
    const { formatter, value } = this.props

    this.unsubscriber = FormatterEmitter.register({
      callback: this.updateFormattedValue,
      formatter,
      value
    })
  }

  componentWillUnmount () {
    this.unsubscriber()
  }

  render () {
    const { formattedValue } = this.state
    return <IntervalFormatterPresenter value={formattedValue} />
  }
}

IntervalFormatter.propTypes = {
  formatter: PropTypes.func,
  value: PropTypes.any
}

export default IntervalFormatter
