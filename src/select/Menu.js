import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isSelected } from './utils'

class Menu extends Component {
  renderOptions(options) {
    const {
      allOption,
      allowSelectAll,
      focusedOption,
      getOptionLabel,
      groupTitleKey,
      groupValueKey,
      labelKey,
      onOptionClick,
      onOptionFocus,
      optionComponent,
      optionGroupComponent,
      optionGroupRenderer,
      optionRef,
      optionRenderer,
      value,
      valueKey
    } = this.props

    const OptionComponent = optionComponent
    const OptionGroupComponent = optionGroupComponent

    if (!options) {
      return null
    }

    const optionProps = {
      onOptionClick,
      onOptionFocus,
      allowSelectAll,
      allOption,
      getOptionLabel,
      labelKey,
      optionRef,
      optionRenderer,
      valueKey
    }

    const optionGroupProps = {
      optionGroupRenderer,
      optionRef,
      groupTitleKey,
      groupValueKey,
      value,
      valueKey,
      ...optionProps
    }

    return options.map((option) => {
      const isFocused = option === focusedOption

      if (option.options && Array.isArray(option.options)) {
        // TODO: undo the recursion so we can convert this to a function component
        return (
          <OptionGroupComponent
            {...optionGroupProps}
            key={option[groupValueKey]}
            option={option}
            isFocused={isFocused}
          >
            {this.renderOptions(option.options)}
          </OptionGroupComponent>
        )
      }

      const selected = isSelected(option, value, valueKey)

      return (
        <OptionComponent
          {...optionProps}
          key={option[valueKey]}
          option={option}
          isFocused={isFocused}
          selected={selected}
        />
      )
    })
  }

  render() {
    const {
      allOption,
      allowSelectAll,
      focusedOption,
      getOptionLabel,
      labelKey,
      menuRef,
      onOptionClick,
      onOptionFocus,
      optionComponent,
      optionRef,
      optionRenderer,
      options,
      staticOption,
      value,
      valueKey
    } = this.props

    const OptionComponent = optionComponent
    const selected = staticOption && isSelected(staticOption, value, valueKey)
    const isFocused = staticOption && staticOption === focusedOption

    return (
      <div className="crane-select-menu" ref={menuRef}>
        {this.renderOptions(options)}
        {!!staticOption && <div className="crane-select-static-divider" />}
        {!!staticOption && (
          <OptionComponent
            onOptionClick={onOptionClick}
            onOptionFocus={onOptionFocus}
            allowSelectAll={allowSelectAll}
            allOption={allOption}
            getOptionLabel={getOptionLabel}
            labelKey={labelKey}
            optionRef={optionRef}
            optionRenderer={optionRenderer}
            valueKey={valueKey}
            option={staticOption}
            isFocused={isFocused}
            selected={selected}
          />
        )}
      </div>
    )
  }
}

Menu.propTypes = {
  allOption: PropTypes.object,
  allowSelectAll: PropTypes.bool,
  focusedOption: PropTypes.object,
  getOptionLabel: PropTypes.func.isRequired,
  groupTitleKey: PropTypes.string,
  groupValueKey: PropTypes.string,
  labelKey: PropTypes.string,
  menuRef: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  onOptionFocus: PropTypes.func.isRequired,
  optionComponent: PropTypes.func,
  optionGroupComponent: PropTypes.func,
  optionGroupRenderer: PropTypes.func,
  optionRef: PropTypes.func.isRequired,
  optionRenderer: PropTypes.func,
  options: PropTypes.array,
  staticOption: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  valueKey: PropTypes.string
}

Menu.defaultProps = {
  allOption: null,
  allowSelectAll: false,
  focusedOption: null,
  groupTitleKey: '',
  groupValueKey: '',
  labelKey: '',
  optionComponent: null,
  optionGroupComponent: null,
  optionGroupRenderer: null,
  optionRenderer: null,
  options: [],
  staticOption: null,
  value: null,
  valueKey: ''
}

export default Menu
