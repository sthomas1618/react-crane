import React, { Component } from 'react'
import PropType from 'prop-types'

import { getSelectValue } from './utils'

class Value extends Component {
  static propTypes = {
    labelKey: PropType.string.isRequired,
    value: PropType.oneOfType([PropType.object, PropType.array, PropType.string]),
    valueRenderer: PropType.func,
    valueKey: PropType.string.isRequired,
    options: PropType.array.isRequired
  }

  static defaultProps = {
    value: null,
    valueRenderer: null
  }

  render() {
    const { value, labelKey, valueRenderer, valueKey, options } = this.props

    if (!value) {
      return null
    }

    const valueObj = getSelectValue({ value, valueKey, options })

    const renderer = valueRenderer
      ? valueRenderer({ valueObj, labelKey })
      : valueObj[labelKey]

    return <span>{renderer}</span>
  }
}

export default Value
