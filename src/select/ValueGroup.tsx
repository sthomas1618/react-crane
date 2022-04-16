import React, { Component } from 'react'

import { ValueGroupProps } from './typeDefs'
import { getSelectValue } from './utils'

class ValueGroup<T> extends Component<ValueGroupProps> {
  render() {
    const {
      clearInputOnSelect,
      getLabel,
      inputValue = '',
      isFocused,
      labelKey = '',
      options,
      placeholder = '',
      showInput,
      showValuesWhileFocused = false,
      value,
      valueComponent,
      valueKey,
      valueGroupRenderer,
      valueRenderer
    } = this.props
    const defaultRenderer = () => {
      const option = getSelectValue({ value, valueKey, options })
      const ValueComponent = valueComponent
      return (
        <ValueComponent
          getLabel={getLabel}
          labelKey={labelKey}
          option={option}
          value={value}
          valueKey={valueKey}
          valueRenderer={valueRenderer}
        />
      )
    }

    if (showInput && inputValue && !showValuesWhileFocused) {
      return null
    }

    const {
      valueGroupRenderer: _valueGroupRenderer,
      placeholder: _placeholder,
      ...rendererProps
    } = this.props

    // Don't include group headers or select all in the count
    let newValue = value

    if (Array.isArray(value)) {
      newValue = value.filter((val) => !val.options)
      rendererProps.value = newValue
    }

    const renderedValue = valueGroupRenderer ? valueGroupRenderer(rendererProps) : defaultRenderer()
    const showValue = Array.isArray(newValue) ? newValue.length : newValue
    const renderer =
      (clearInputOnSelect && showValue) || (showValuesWhileFocused && isFocused) ? (
        { renderedValue }
      ) : (
        <span className="crane-select-placeholder">{placeholder}</span>
      )

    return showValuesWhileFocused ? (
      renderer
    ) : (
      <div className="crane-select-value-group">{renderer}</div>
    )
  }
}

export default ValueGroup
