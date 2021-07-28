import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { isValueEqual } from './utils'

// TODO: FUTURE convert to function component and use React.Memo
class OptionGroup extends PureComponent {
  onMouseDown = (event) => {
    // If the label is clicked but the option is disabled, do nothing.
    if (event && event.target && event.target.ariaDisabled === 'true') {
      return
    }
    const { onOptionClick, option, value } = this.props
    const isGroup = Array.isArray(option.options)
    const isMulti = Array.isArray(value)
    // when the current option is a parent of a group and
    // it is not in multi mode, then return the previous value.
    // this prevents returning a invalid "parent" value in non-multi mode.
    const newValue = !isMulti && isGroup ? value : option

    onOptionClick(event, newValue)
  }

  onFocus = (event) => {
    const { isFocused, onOptionFocus, option } = this.props
    if (!isFocused) {
      onOptionFocus(event, option)
    }
  }

  render() {
    const {
      children,
      option,
      optionDisabledKey,
      optionGroupRenderer,
      optionRef,
      groupTitleKey,
      groupValueKey,
      value,
      valueKey
    } = this.props

    if (!option) {
      return null
    }

    const optionGroupRendererProps = {
      groupTitleKey,
      groupValueKey,
      option,
      optionDisabledKey,
      value,
      valueKey
    }
    const renderer = optionGroupRenderer
      ? optionGroupRenderer(optionGroupRendererProps)
      : option[groupTitleKey]

    const selected = value && value.length > 0 &&
    value.some(val => (
      isValueEqual(option, val, groupValueKey) ||
      (
        option.options &&
        option.options.length > 0 &&
        option.options.some(opt => isValueEqual(opt, val, valueKey))
      )
    ))

    return (
      <div
        ref={el => optionRef(el, option[valueKey])}
        aria-selected={selected}
        className="crane-select-option"
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onFocus}
        onMouseMove={this.onFocus}
        role="option"
        tabIndex="0"
      >
        <span className="crane-select-group-header">
          {renderer}
        </span>
        {children}
      </div>
    )
  }
}

OptionGroup.propTypes = {
  children: PropTypes.array.isRequired,
  groupTitleKey: PropTypes.string,
  groupValueKey: PropTypes.string,
  isFocused: PropTypes.bool,
  onOptionClick: PropTypes.func.isRequired,
  onOptionFocus: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  optionDisabledKey: PropTypes.string,
  optionGroupRenderer: PropTypes.func,
  optionRef: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  valueKey: PropTypes.string
}

OptionGroup.defaultProps = {
  groupTitleKey: 'label',
  groupValueKey: 'groupId',
  isFocused: false,
  optionDisabledKey: 'isDisabled',
  optionGroupRenderer: null,
  value: null,
  valueKey: 'value'
}

export default OptionGroup
