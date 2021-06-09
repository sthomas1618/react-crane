import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// TODO: FUTURE convert to function component and use React.Memo
class Option extends PureComponent {
  onMouseDown = (event) => {
    const { onOptionClick, option } = this.props
    onOptionClick(event, option)
  }

  onFocus = (event) => {
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
      selected
    }
    const renderer = optionRenderer
      ? optionRenderer(optionRendererProps)
      : getOptionLabel({ option, labelKey, selected })
    const className = `crane-select-option${isFocused ? ' focused' : ''} ${allowSelectAll && option[valueKey] === allOption[valueKey] ? ' crane-select-group-header' : ''}`

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
  optionRenderer: null,
  selected: false,
  valueKey: 'value'
}

export default Option
