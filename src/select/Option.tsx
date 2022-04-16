import React, { PureComponent } from 'react'

import { OptionProps } from './typeDefs'

// TODO: FUTURE convert to function component and use React.Memo
class Option extends PureComponent<OptionProps> {
  handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onOptionClick, optionDisabledKey = 'isDisabled', option } = this.props
    if (!option[optionDisabledKey]) {
      onOptionClick(event, option)
    }
  }

  handleMouseEnterOrMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { isFocused, onOptionFocus, option } = this.props
    if (!isFocused) {
      onOptionFocus(event, option)
    }
  }

  handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    const { isFocused, onOptionFocus, option } = this.props
    if (!isFocused) {
      onOptionFocus(event, option)
    }
  }

  render() {
    const {
      allowSelectAll = false,
      allOption,
      getOptionLabel,
      hideCheckboxes = false,
      isFocused = false,
      labelKey = '',
      option,
      optionDisabledKey = 'isDisabled',
      optionRef,
      optionRenderer,
      selected = false,
      valueKey = ''
    } = this.props

    if (!option) {
      return null
    }

    const optionRendererProps = {
      getOptionLabel,
      hideCheckboxes,
      labelKey,
      option,
      optionDisabledKey,
      selected
    }
    const isDisabled = !!option[optionDisabledKey]
    const renderer = optionRenderer
      ? optionRenderer(optionRendererProps)
      : getOptionLabel({
          labelKey,
          option,
          optionDisabledKey,
          selected
        })
    const className = `crane-select-option${isFocused && !isDisabled ? ' focused' : ''}
      ${isDisabled ? ' disabled' : ''}
      ${
        allowSelectAll && allOption && option[valueKey] === allOption[valueKey]
          ? ' crane-select-group-header'
          : ''
      }`
    const optionDomId = `crane-item-${option[valueKey]}`

    return (
      // options get psuedo focus while DOM focus remains on the input.
      // There is no need for a tabindex on the option.
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        id={optionDomId}
        ref={(el) => optionRef(el, option[valueKey] as string)}
        aria-disabled={isDisabled}
        aria-selected={selected}
        className={className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnterOrMove}
        onMouseMove={this.handleMouseEnterOrMove}
        onFocus={this.handleFocus}
        role="option"
      >
        {renderer}
      </div>
    )
  }
}

export default Option
