import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OptionGroup extends Component {
  static propTypes = {
    groupTitleKey: PropTypes.string,
    valueKey: PropTypes.string,
    onOptionClick: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    optionGroupRenderer: PropTypes.func,
    optionRef: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
  }

  static defaultProps = {
    optionGroupRenderer: null,
    groupTitleKey: 'label',
    valueKey: 'value'
  }

  onMouseDown = (event) => {
    this.props.onOptionClick(event, this.props.option)
  }

  render() {
    const { option,
      valueKey,
      optionGroupRenderer,
      optionRef,
      children,
      groupTitleKey } = this.props

    if (!option) {
      return null
    }

    const renderer = optionGroupRenderer
      ? optionGroupRenderer(_.omit(this.props), 'optionGroupRenderer', 'onOptionClick')
      : option[groupTitleKey]

    return (
      <div
        ref={el => optionRef(el, option[valueKey])}
        aria-selected="false"
        className={'crane-select-option'}
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
