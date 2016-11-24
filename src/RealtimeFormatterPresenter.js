import React, { PropTypes } from 'react'
import omit from 'lodash.omit'

const RealtimeFormatterPresenter = (props) => {
  const { tag, value } = props
  const otherProps = omit(props, Object.keys(RealtimeFormatterPresenter.propTypes))

  return React.createElement(tag, Object.assign(otherProps, {
    children: value
  }))
}

RealtimeFormatterPresenter.propTypes = {
  tag: PropTypes.string,
  value: PropTypes.node
}

RealtimeFormatterPresenter.defaultProps = {
  tag: 'span'
}

export default RealtimeFormatterPresenter
