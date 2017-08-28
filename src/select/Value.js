import React, { Component } from 'react'
import PropType from 'prop-types'

class Value extends Component {
  static propTypes = {
    labelKey: PropType.string,
    value: PropType.object,
    valueRenderer: PropType.func
  }

  static defaultProps = {
    labelKey: 'label',
    value: null,
    valueRenderer: null
  }

  render() {
    const { value, labelKey, valueRenderer } = this.props

    if (!value) {
      return null
    }

    const renderer = valueRenderer
      ? valueRenderer({ value, labelKey })
      : value[labelKey]

    return <div>{renderer}</div>
  }
}

export default Value
