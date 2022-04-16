import React, { PureComponent } from 'react'

import { OptionGroupProps } from './typeDefs'
import { isValueEqual } from './utils'

// TODO: FUTURE convert to function component and use React.Memo
class OptionGroup<T> extends PureComponent<OptionGroupProps> {
  handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // If the label is clicked but the option is disabled, do nothing.
    if (event && event.target && event.currentTarget.ariaDisabled === 'true') {
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

  handleFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    const { isFocused, onOptionFocus, option } = this.props
    if (!isFocused) {
      onOptionFocus(event, option)
    }
  }

  render() {
    const {
      children,
      option,
      optionDisabledKey = 'isDisabled',
      optionGroupRenderer,
      optionRef,
      groupTitleKey = 'label',
      groupValueKey = 'groupId',
      value,
      valueKey = 'value'
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
      : (option[groupTitleKey] as string)

    const selected =
      !!value &&
      Array.isArray(value) &&
      value.length > 0 &&
      value.some(
        (val) =>
          isValueEqual(option, val, groupValueKey) ||
          (option.options &&
            Array.isArray(option.options) &&
            option.options.length > 0 &&
            option.options.some((opt) => isValueEqual(opt, val, valueKey)))
      )
    const optionDomId = `crane-item-${option[groupValueKey]}`

    return (
      // options get psuedo focus while DOM focus remains on the input.
      // There is no need for a tabindex on the option.
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        id={optionDomId}
        ref={(el) => optionRef(el, option[valueKey] as string)}
        aria-selected={selected}
        className="crane-select-option"
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleFocus}
        onMouseMove={this.handleFocus}
        role="option"
      >
        <span className="crane-select-group-header">{renderer}</span>
        {children}
      </div>
    )
  }
}

export default OptionGroup
