import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  static propTypes = {
    labelKey: PropTypes.string,
    focusedOption: PropTypes.object,
    onOptionClick: PropTypes.func.isRequired,
    optionComponent: PropTypes.func,
    optionRenderer: PropTypes.func,
    options: PropTypes.array,
    valueKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    menuRef: PropTypes.func.isRequired
  }

  static defaultProps = {
    options: [],
    focusedOption: null,
    labelKey: '',
    valueKey: '',
    optionComponent: null,
    optionRenderer: null,
    value: null
  }

  renderOptions(optionProps) {
    const { options, valueKey, focusedOption } = this.props
    const OptionComponent = this.props.optionComponent

    return options.map((option) => {
      const isFocused = option === focusedOption

      return (
        <OptionComponent
          {...optionProps}
          key={option[valueKey]}
          option={option}
          isFocused={isFocused}
        />
      )
    })
  }

  render() {
    const optionProps = _.omit(this.props, 'optionComponent')

    return (
      <div className="crane-select-menu" ref={this.props.menuRef}>
        {this.renderOptions(optionProps)}
      </div>
    )
  }
}

export default Menu
