import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash.omit'

const IntervalFormatterPresenter = (props) => {
  const { tag, value } = props
  const otherProps = omit(props, Object.keys(IntervalFormatterPresenter.propTypes))

  return React.createElement(tag, Object.assign(otherProps, {
    children: value
  }))
}

IntervalFormatterPresenter.propTypes = {
  tag: PropTypes.string,
  value: PropTypes.node
}

IntervalFormatterPresenter.defaultProps = {
  tag: 'span'
}

export default IntervalFormatterPresenter
