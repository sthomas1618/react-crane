import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  static propTypes = {
    labelKey: PropTypes.string,
    focusedOption: PropTypes.object,
    groupValueKey: PropTypes.string,
    onOptionClick: PropTypes.func.isRequired,
    optionComponent: PropTypes.func,
    optionGroupComponent: PropTypes.func,
    optionRenderer: PropTypes.func,
    optionGroupRenderer: PropTypes.func,
    options: PropTypes.array,
    valueKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    menuRef: PropTypes.func.isRequired
  }

  static defaultProps = {
    options: [],
    focusedOption: null,
    groupValueKey: '',
    labelKey: '',
    valueKey: '',
    optionComponent: null,
    optionGroupComponent: null,
    optionRenderer: null,
    optionGroupRenderer: null,
    value: null
  }

  renderOptions(options) {
    const {
      groupValueKey,
      valueKey,
      focusedOption,
      optionComponent,
      optionGroupComponent
    } = this.props
    const optionProps = _.omit(this.props, 'optionComponent', 'options')
    const OptionComponent = optionComponent
    const OptionGroupComponent = optionGroupComponent

    if (!options) {
      return null
    }

    return options.map((option) => {
      const isFocused = option === focusedOption

      if (option.options && Array.isArray(option.options)) {
        return (
          <OptionGroupComponent
            {...optionProps}
            key={option[groupValueKey]}
            option={option}
            isFocused={isFocused}
          >
            {this.renderOptions(option.options)}
          </OptionGroupComponent>
        )
      }

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
    const { options } = this.props

    return (
      <div className="crane-select-menu" ref={this.props.menuRef}>
        {this.renderOptions(options)}
      </div>
    )
  }
}

export default Menu
