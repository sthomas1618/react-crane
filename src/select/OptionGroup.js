import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isValueEqual } from './utils'

class OptionGroup extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    groupTitleKey: PropTypes.string,
    groupValueKey: PropTypes.string,
    onOptionClick: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    optionGroupRenderer: PropTypes.func,
    optionRef: PropTypes.func.isRequired,
    value: PropTypes.any,
    valueKey: PropTypes.string
  }

  static defaultProps = {
    optionGroupRenderer: null,
    groupTitleKey: 'label',
    groupValueKey: 'groupId',
    value: null,
    valueKey: 'value'
  }

  onMouseDown = (event) => {
    this.props.onOptionClick(event, this.props.option)
  }

  render() {
    const {
      children,
      option,
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

    const {
      optionGroupRenderer: _optionGroupRenderer,
      onOptionClick,
      ...optionGroupRendererProps
    } = this.props
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

export default OptionGroup
