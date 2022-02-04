import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// TODO: FUTURE convert to function component and use React.Memo
class Option extends PureComponent {
  handleMouseDown = (event) => {
    const { onOptionClick, optionDisabledKey, option } = this.props
    if (!option[optionDisabledKey]) {
      onOptionClick(event, option)
    }
  }

  handleFocus = (event) => {
    const { isFocused, onOptionFocus, option } = this.props
    if (!isFocused) {
      onOptionFocus(event, option)
    }
  }

  render() {
    const {
      allowSelectAll,
      allOption,
      getOptionLabel,
      hideCheckboxes,
      isFocused,
      labelKey,
      option,
      optionDisabledKey,
      optionRef,
      optionRenderer,
      selected,
      valueKey
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
    const isDisabled = option[optionDisabledKey]
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
        allowSelectAll && option[valueKey] === allOption[valueKey]
          ? ' crane-select-group-header'
          : ''
      }`

    return (
      <div
        ref={(el) => optionRef(el, option[valueKey])}
        aria-disabled={isDisabled}
        aria-selected={selected}
        className={className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleFocus}
        onMouseMove={this.handleFocus}
        onFocus={this.handleFocus}
        role="option"
        tabIndex="0"
      >
        {renderer}
      </div>
    )
  }
}

Option.propTypes = {
  allOption: PropTypes.object,
  allowSelectAll: PropTypes.bool,
  getOptionLabel: PropTypes.func.isRequired,
  hideCheckboxes: PropTypes.bool,
  isFocused: PropTypes.bool,
  labelKey: PropTypes.string,
  onOptionClick: PropTypes.func.isRequired,
  onOptionFocus: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  optionDisabledKey: PropTypes.string,
  optionRef: PropTypes.func.isRequired,
  optionRenderer: PropTypes.func,
  selected: PropTypes.bool,
  valueKey: PropTypes.string
}

Option.defaultProps = {
  allowSelectAll: false,
  allOption: null,
  hideCheckboxes: false,
  isFocused: false,
  labelKey: '',
  optionDisabledKey: 'isDisabled',
  optionRenderer: null,
  selected: false,
  valueKey: 'value'
}

export default Option
