import React, { Component } from 'react'

import { Option, MenuProps } from './typeDefs'
// import alone to avoid dep cycle
import isSelected from './utils/isSelected'

class Menu<T> extends Component<MenuProps> {
  renderOptions(options?: Option[]) {
    const {
      allOption,
      allowSelectAll,
      focusedOption,
      getOptionLabel,
      groupTitleKey = '',
      groupValueKey = '',
      hideCheckboxes,
      labelKey,
      onOptionClick,
      onOptionFocus,
      optionComponent,
      optionDisabledKey = 'isDisabled',
      optionGroupComponent,
      optionGroupRenderer,
      optionRef,
      optionRenderer,
      value,
      valueKey = ''
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
      optionDisabledKey,
      optionRef,
      optionRenderer,
      valueKey
    }

    const optionGroupProps = {
      groupTitleKey,
      groupValueKey,
      optionGroupRenderer,
      value,
      ...optionProps
    }

    return options.map((option) => {
      const isFocused = option === focusedOption

      // Nested options
      if (option.options && Array.isArray(option.options)) {
        // TODO: undo the recursion so we can convert this to a function component
        return (
          <OptionGroupComponent
            {...optionGroupProps}
            key={option[groupValueKey] as string}
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
          key={option[valueKey] as string}
          hideCheckboxes={hideCheckboxes}
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
      optionDisabledKey = 'isDisabled',
      optionRef,
      optionRenderer,
      options = [],
      staticOption,
      value,
      valueKey = ''
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
      <div aria-label="menu" className="crane-select-menu" ref={menuRef} role="listbox">
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
                key={option[valueKey] as string}
                allowSelectAll={allowSelectAll}
                allOption={allOption}
                getOptionLabel={getOptionLabel}
                hideCheckboxes={hideCheckboxes}
                labelKey={labelKey}
                onOptionClick={onOptionClick}
                onOptionFocus={onOptionFocus}
                optionDisabledKey={optionDisabledKey}
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

export default Menu
