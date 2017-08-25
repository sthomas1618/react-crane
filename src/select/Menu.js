import React, { Component } from 'react'
import PropType from 'prop-types'

class Menu extends Component {
  static propTypes = {
    labelKey: PropType.string,
    onOptionClick: PropType.func.isRequired,
    optionComponent: PropType.func,
    options: PropType.array,
    valueKey: PropType.string
  }

  static defaultProps = {
    options: [],
    labelKey: '',
    valueKey: '',
    optionComponent: null
  }

  renderOptions() {
    const { labelKey, options, valueKey } = this.props
    const OptionComponent = this.props.optionComponent
    return options.map(option => (
      <OptionComponent
        key={option[valueKey]}
        labelKey={labelKey}
        onMouseDown={this.props.onOptionClick}
        option={option}
      />
    ))
  }

  render() {
    return (
      <div className="crane-select-menu">
        {this.renderOptions()}
      </div>
    )
  }
}

export default Menu
