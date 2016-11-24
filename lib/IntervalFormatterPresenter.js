'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IntervalFormatterPresenter = function IntervalFormatterPresenter(props) {
  var tag = props.tag,
      value = props.value;

  var otherProps = (0, _lodash2.default)(props, Object.keys(IntervalFormatterPresenter.propTypes));

  return _react2.default.createElement(tag, Object.assign(otherProps, {
    children: value
  }));
};

IntervalFormatterPresenter.propTypes = {
  tag: _react.PropTypes.string,
  value: _react.PropTypes.node
};

IntervalFormatterPresenter.defaultProps = {
  tag: 'span'
};

exports.default = IntervalFormatterPresenter;