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
      hideCheckboxes,
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

    if (!options) {
      return null
    }

    const OptionComponent = optionComponent
    const OptionGroupComponent = optionGroupComponent

    const optionProps = {
      allowSelectAll,
      allOption,
      getOptionLabel,
      hideCheckboxes,
      labelKey,
      onOptionClick,
      onOptionFocus,
      optionRef,
      optionRenderer,
      valueKey
    }

    const optionGroupProps = {
      groupTitleKey,
      groupValueKey,
      optionGroupRenderer,
      optionRef,
      value,
      valueKey,
      ...optionProps
    }

    return options.map((option) => {
      const isFocused = option === focusedOption
      const { isDisabled } = option

      // Nested options
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
          hideCheckboxes={hideCheckboxes}
          isDisabled={isDisabled}
          isFocused={isFocused}
          option={option}
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
      hideCheckboxes,
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

    let multiStaticOptions = []
    const isMulti = Array.isArray(staticOption)
    if (staticOption && isMulti) {
      multiStaticOptions = staticOption
    } else if (staticOption && !isMulti) {
      multiStaticOptions.push(staticOption)
    }

    return (
      <div
        aria-label="menu"
        className="crane-select-menu"
        ref={menuRef}
        role="listbox"
      >
        {this.renderOptions(options)}
        {!!options.length && !!multiStaticOptions.length && (
          <div className="crane-select-static-divider" />
        )}
        {!!multiStaticOptions.length &&
          multiStaticOptions.map((option) => {
            const selected = option && isSelected(option, value, valueKey)
            const isFocused = option && option === focusedOption
            return (
              <OptionComponent
                key={option[valueKey]}
                allowSelectAll={allowSelectAll}
                allOption={allOption}
                getOptionLabel={getOptionLabel}
                hideCheckboxes={hideCheckboxes}
                labelKey={labelKey}
                onOptionClick={onOptionClick}
                onOptionFocus={onOptionFocus}
                optionRef={optionRef}
                optionRenderer={optionRenderer}
                valueKey={valueKey}
                option={option}
                isFocused={isFocused}
                selected={selected}
              />
            )
          })}
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
  hideCheckboxes: PropTypes.bool,
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
  staticOption: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
  hideCheckboxes: false,
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
