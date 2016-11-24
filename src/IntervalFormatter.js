import React, { Component, PropTypes } from 'react'
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
    const otherProps = omit(this.props, Object.keys(IntervalFormatter.propTypes))

    return <IntervalFormatterPresenter value={formattedValue} {...otherProps} />
  }
}

IntervalFormatter.propTypes = {
  formatter: PropTypes.func,
  value: PropTypes.any
}

export default IntervalFormatter
