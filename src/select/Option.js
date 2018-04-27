import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Option extends Component {
  static propTypes = {
    allowSelectAll: PropTypes.bool,
    allOption: PropTypes.object,
    getOptionLabel: PropTypes.func.isRequired,
    valueKey: PropTypes.string,
    onOptionClick: PropTypes.func.isRequired,
    onOptionFocus: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    optionRenderer: PropTypes.func,
    optionRef: PropTypes.func.isRequired,
    isFocused: PropTypes.bool
  }

  static defaultProps = {
    allowSelectAll: false,
    allOption: null,
    optionRenderer: null,
    valueKey: 'value',
    isFocused: false
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
    const { allowSelectAll,
      allOption,
      getOptionLabel,
      option,
      valueKey,
      optionRenderer,
      optionRef,
      isFocused } = this.props

    if (!option) {
      return null
    }

    const renderer = optionRenderer
      ? optionRenderer(_.omit(this.props), 'optionRenderer', 'onOptionClick')
      : getOptionLabel(this.props)

    const className = `crane-select-option${isFocused ? ' focused' : ''} ${allowSelectAll && option === allOption ? ' crane-select-group-header' : ''}`

    return (
      <div
        ref={el => optionRef(el, option[valueKey])}
        aria-selected="false"
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
