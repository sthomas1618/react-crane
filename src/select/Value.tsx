import React, { PureComponent } from 'react'

import { ValueProps } from './typeDefs'

class Value<T> extends PureComponent<ValueProps> {
  render() {
    const { labelKey, valueRenderer, option, getLabel } = this.props

    if (!option) {
      return null
    }

    const renderer = valueRenderer
      ? valueRenderer({ option, labelKey })
      : getLabel(option, labelKey)

    return <span>{renderer}</span>
  }
}

export default Value
