import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getSelectValue } from './utils'

class ValueGroup extends Component {
  onMouseDown = (event) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(this.props.value, event)
    }
  }

  render() {
    const {
      clearInputOnSelect,
      getLabel,
      inputValue,
      labelKey,
      options,
      placeholder,
      showInput,
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
    const ValueRenderer = valueGroupRenderer || defaultRenderer

    if (showInput && inputValue) {
      return null
    }

    const {
      valueGroupRenderer: _valueGroupRenderer,
      placeholder: _placeholder,
      ...rendererProps
    } = this.props

    // Don't include group headers or select all in the count
    let newValue = value

    if (Array.isArray(newValue)) {
      newValue = value.filter(val => (!val.options))
      rendererProps.value = newValue
    }

    const showValue = Array.isArray(newValue) ? newValue.length : newValue
    const renderer = clearInputOnSelect && showValue
      ? <ValueRenderer {...rendererProps} />
      : <span className="crane-select-placeholder">{placeholder}</span>

    return <div className="crane-select-value-group">{renderer}</div>
  }
}

ValueGroup.propTypes = {
  clearInputOnSelect: PropTypes.bool,
  getLabel: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  labelKey: PropTypes.string,
  options: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  showInput: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  valueComponent: PropTypes.func,
  valueKey: PropTypes.string.isRequired,
  valueGroupRenderer: PropTypes.func,
  valueRenderer: PropTypes.func
}

ValueGroup.defaultProps = {
  clearInputOnSelect: true,
  inputValue: '',
  labelKey: '',
  onMouseDown: null,
  placeholder: '',
  showInput: false,
  value: null,
  valueComponent: null,
  valueGroupRenderer: null,
  valueRenderer: null
}

export default ValueGroup
