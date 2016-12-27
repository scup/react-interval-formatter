import React, { Component } from 'react'
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
    this.unsubscriber && this.unsubscriber()

    this.subscribe(nextProps)
    this.updateFormattedValue(formatter(value))
  }

  componentWillUnmount () {
    this.unsubscriber()
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
}

IntervalFormatter.propTypes = {
  formatter: React.PropTypes.func,
  value: React.PropTypes.any
}

export default IntervalFormatter
