import _ from 'lodash'
import React, { Component } from 'react'
import PropType from 'prop-types'

class Option extends Component {
  static propTypes = {
    labelKey: PropType.string,
    onOptionClick: PropType.func.isRequired,
    option: PropType.object.isRequired,
    optionRenderer: PropType.func
  }

  static defaultProps = {
    optionRenderer: null,
    labelKey: 'label'
  }

  onMouseDown = (event) => {
    this.props.onOptionClick(event, this.props.option)
  }

  render() {
    const { option, labelKey, optionRenderer } = this.props

    if (!option) {
      return null
    }

    const renderer = optionRenderer
      ? optionRenderer(_.omit(this.props), 'optionRenderer', 'onOptionClick')
      : option[labelKey]

    return (
      <div
        aria-selected="false"
        className="crane-select-option"
        onMouseDown={this.onMouseDown}
        role="option"
        tabIndex="0"
      >
        {renderer}
      </div>
    )
  }
}

export default Option
