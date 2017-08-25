import React, { Component } from 'react'
import PropType from 'prop-types'

class Option extends Component {
  static propTypes = {
    labelKey: PropType.string,
    onMouseDown: PropType.func.isRequired,
    option: PropType.object
  }

  static defaultProps = {
    option: null,
    labelKey: 'label'
  }

  onMouseDown = (event) => {
    this.props.onMouseDown(event, this.props.option)
  }

  render() {
    const { option, labelKey } = this.props

    if (!option) {
      return null
    }

    const label = option[labelKey]

    return (
      <div
        aria-selected="false"
        className="crane-select-option"
        onMouseDown={this.onMouseDown}
        role="option"
        tabIndex="0"
      >
        {label}
      </div>
    )
  }
}

export default Option
