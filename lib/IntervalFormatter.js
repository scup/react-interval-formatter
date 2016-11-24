'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _IntervalFormatterPresenter = require('./IntervalFormatterPresenter');

var _IntervalFormatterPresenter2 = _interopRequireDefault(_IntervalFormatterPresenter);

var _FormatterEmitter = require('./FormatterEmitter');

var _FormatterEmitter2 = _interopRequireDefault(_FormatterEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntervalFormatter = function (_Component) {
  _inherits(IntervalFormatter, _Component);

  function IntervalFormatter(props) {
    _classCallCheck(this, IntervalFormatter);

    var _this = _possibleConstructorReturn(this, (IntervalFormatter.__proto__ || Object.getPrototypeOf(IntervalFormatter)).call(this, props));

    _this.state = {
      formattedValue: null
    };

    _this.updateFormattedValue = _this.updateFormattedValue.bind(_this);
    return _this;
  }

  _createClass(IntervalFormatter, [{
    key: 'updateFormattedValue',
    value: function updateFormattedValue(formattedValue) {
      this.setState({ formattedValue: formattedValue });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          formatter = _props.formatter,
          value = _props.value;


      this.unsubscriber = _FormatterEmitter2.default.register({
        callback: this.updateFormattedValue,
        formatter: formatter,
        value: value
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscriber();
    }
  }, {
    key: 'render',
    value: function render() {
      var formattedValue = this.state.formattedValue;

      var otherProps = (0, _lodash2.default)(this.props, Object.keys(IntervalFormatter.propTypes));

      return _react2.default.createElement(_IntervalFormatterPresenter2.default, _extends({ value: formattedValue }, otherProps));
    }
  }]);

  return IntervalFormatter;
}(_react.Component);

IntervalFormatter.propTypes = {
  formatter: _react.PropTypes.func,
  value: _react.PropTypes.any
};

exports.default = IntervalFormatter;