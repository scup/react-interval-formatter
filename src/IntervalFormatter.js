const dependencies = { window }

class FormatterCache {
  constructor ({ value, formatter, callback }) {
    Object.assign(this, {
      value,
      formatter,
      callback
    })

    this.formatValue = this.formatValue.bind(this)
    this.formatValue()
  }

  formatValue () {
    const formattedValue = this.formatter(this.value)

    if (this.formattedValue !== formattedValue) {
      Object.assign(this, { formattedValue })
      this.callback(formattedValue)
    }
  }
}

class IntervalFormatter {
  constructor () {
    this.subscriptions = new Set()
    this.interval = null

    this.formatSubscriptions = this.formatSubscriptions.bind(this)
    this.register = this.register.bind(this)
  }

  formatSubscriptions () {
    this.subscriptions.forEach(formatter => formatter.formatValue())
  }

  register ({ value, formatter, callback }, injection) {
    const { window } = Object.assign({}, dependencies, injection)

    const formatterCache = new FormatterCache({ value, formatter, callback })
    this.subscriptions.add(formatterCache)

    if (this.interval === null) {
      this.interval = window.setInterval(this.formatSubscriptions, 15000)
    }

    return () => {
      this.subscriptions.delete(formatterCache)

      if (this.subscriptions.size === 0) {
        window.clearInterval(this.interval)
        this.interval = null
      }
    }
  }
}

export default new IntervalFormatter()
