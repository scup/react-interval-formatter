import React from 'react'
import omit from 'lodash.omit'

const IntervalFormatterPresenter = (props) => {
  const { tag, value } = props
  const otherProps = omit(props, Object.keys(IntervalFormatterPresenter.propTypes))

  return React.createElement(tag, Object.assign(otherProps, {
    children: value
  }))
}

IntervalFormatterPresenter.propTypes = {
  tag: React.PropTypes.string,
  value: React.PropTypes.node
}

IntervalFormatterPresenter.defaultProps = {
  tag: 'span'
}

export default IntervalFormatterPresenter
