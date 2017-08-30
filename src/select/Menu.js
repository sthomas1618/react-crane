import _ from 'lodash'
import React, { Component } from 'react'
import PropType from 'prop-types'

class Menu extends Component {
  static propTypes = {
    labelKey: PropType.string,
    onOptionClick: PropType.func.isRequired,
    optionComponent: PropType.func,
    optionRenderer: PropType.func,
    options: PropType.array,
    valueKey: PropType.string,
    value: PropType.oneOfType([PropType.object, PropType.array])
  }

  static defaultProps = {
    options: [],
    labelKey: '',
    valueKey: '',
    optionComponent: null,
    optionRenderer: null,
    value: null
  }

  renderOptions(optionProps) {
    const { options, valueKey } = this.props
    const OptionComponent = this.props.optionComponent

    return options.map(option => (
      <OptionComponent
        {...optionProps}
        key={option[valueKey]}
        option={option}
      />
    ))
  }

  render() {
    const optionProps = _.omit(this.props, 'optionComponent', 'options')

    return (
      <div className="crane-select-menu">
        {this.renderOptions(optionProps)}
      </div>
    )
  }
}

export default Menu
