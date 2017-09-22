import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getSelectValue } from './utils'

class Value extends Component {
  static propTypes = {
    labelKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    valueRenderer: PropTypes.func,
    valueKey: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
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
