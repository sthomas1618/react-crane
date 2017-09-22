import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  static propTypes = {
    labelKey: PropTypes.string,
    onOptionClick: PropTypes.func.isRequired,
    optionComponent: PropTypes.func,
    optionRenderer: PropTypes.func,
    options: PropTypes.array,
    valueKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
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
    const optionProps = _.omit(this.props, 'optionComponent')

    return (
      <div className="crane-select-menu">
        {this.renderOptions(optionProps)}
      </div>
    )
  }
}

export default Menu
