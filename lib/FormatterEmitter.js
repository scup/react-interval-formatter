"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dependencies = { window: window };

var FormatterCache = function () {
  function FormatterCache(_ref) {
    var value = _ref.value,
        formatter = _ref.formatter,
        callback = _ref.callback;

    _classCallCheck(this, FormatterCache);

    Object.assign(this, {
      value: value,
      formatter: formatter,
      callback: callback
    });

    this.formatValue = this.formatValue.bind(this);
    this.formatValue();
  }

  _createClass(FormatterCache, [{
    key: "formatValue",
    value: function formatValue() {
      var formattedValue = this.formatter(this.value);

      if (this.formattedValue !== formattedValue) {
        Object.assign(this, { formattedValue: formattedValue });
        this.callback(formattedValue);
      }
    }
  }]);

  return FormatterCache;
}();

var FormatterEmitter = function () {
  function FormatterEmitter() {
    _classCallCheck(this, FormatterEmitter);

    this.subscriptions = new Set();
    this.interval = null;

    this.formatSubscriptions = this.formatSubscriptions.bind(this);
    this.register = this.register.bind(this);
  }

  _createClass(FormatterEmitter, [{
    key: "formatSubscriptions",
    value: function formatSubscriptions() {
      this.subscriptions.forEach(function (formatter) {
        return formatter.formatValue();
      });
    }
  }, {
    key: "register",
    value: function register(_ref2, injection) {
      var _this = this;

      var value = _ref2.value,
          formatter = _ref2.formatter,
          callback = _ref2.callback;

      var _Object$assign = Object.assign({}, dependencies, injection),
          window = _Object$assign.window;

      var formatterCache = new FormatterCache({ value: value, formatter: formatter, callback: callback });
      this.subscriptions.add(formatterCache);

      if (this.interval === null) {
        this.interval = window.setInterval(this.formatSubscriptions, 15000);
      }

      return function () {
        _this.subscriptions.delete(formatterCache);

        if (_this.subscriptions.size === 0) {
          window.clearInterval(_this.interval);
          _this.interval = null;
        }
      };
    }
  }]);

  return FormatterEmitter;
}();

exports.default = new FormatterEmitter();