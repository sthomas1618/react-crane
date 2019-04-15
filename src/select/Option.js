import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isValueEqual } from './utils'

class Option extends Component {
  static propTypes = {
    allowSelectAll: PropTypes.bool,
    allOption: PropTypes.object,
    getOptionLabel: PropTypes.func.isRequired,
    isFocused: PropTypes.bool,
    onOptionClick: PropTypes.func.isRequired,
    onOptionFocus: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    optionRef: PropTypes.func.isRequired,
    optionRenderer: PropTypes.func,
    value: PropTypes.any,
    valueKey: PropTypes.string
  }

  static defaultProps = {
    allowSelectAll: false,
    allOption: null,
    isFocused: false,
    optionRenderer: null,
    value: null,
    valueKey: 'value'
  }

  onMouseDown = (event) => {
    this.props.onOptionClick(event, this.props.option)
  }

  onFocus = (event) => {
    if (!this.props.isFocused) {
      this.props.onOptionFocus(event, this.props.option)
    }
  }

  render() {
    const {
      allowSelectAll,
      allOption,
      getOptionLabel,
      isFocused,
      option,
      optionRef,
      optionRenderer,
      value,
      valueKey
    } = this.props

    if (!option) {
      return null
    }

    const renderer = optionRenderer
      ? optionRenderer(_.omit(this.props), 'optionRenderer', 'onOptionClick')
      : getOptionLabel(this.props)

    const className = `crane-select-option${isFocused ? ' focused' : ''} ${allowSelectAll && option[valueKey] === allOption[valueKey] ? ' crane-select-group-header' : ''}`

    let selected = false

    if (value !== null) {
      if (Array.isArray(value)) {
        if (value.length > 0 && value.some(val => isValueEqual(option, val, valueKey))) {
          selected = true
        }
      } else if (typeof(value) === 'object' && value[valueKey] === option[valueKey]) {
        selected = true
      } else if (value === option[valueKey]) {
        selected = true
      }
    }

    return (
      <div
        ref={el => optionRef(el, option[valueKey])}
        aria-selected={selected}
        className={className}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onFocus}
        onMouseMove={this.onFocus}
        onFocus={this.onFocus}
        role="option"
        tabIndex="0"
      >
        {renderer}
      </div>
    )
  }
}

export default Option
