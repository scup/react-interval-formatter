import React, { PropTypes } from 'react'
import omit from 'lodash.omit'

const RealtimeFormatter = (props) => {
  const { tag, value } = props
  const otherProps = omit(props, Object.keys(RealtimeFormatter.propTypes))

  return React.createElement(tag, Object.assign(otherProps, {
    children: value
  }))
}

RealtimeFormatter.propTypes = {
  tag: PropTypes.string,
  value: PropTypes.node
}

RealtimeFormatter.defaultProps = {
  tag: 'span'
}

export default RealtimeFormatter
