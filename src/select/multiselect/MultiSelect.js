import React, { Component } from 'react'

import SimpleSelect from '../SimpleSelect'
import OptionRenderer from './OptionRenderer'
import OptionGroupRenderer from './OptionGroupRenderer'
import ValueGroupRenderer from './ValueGroupRenderer'

import { flattenOptions, multiSelectPropTypes, sortBy } from '../utils'
import { multiSelectDefaults } from '../utils/DefaultProps'

class MultiSelect extends Component {
  handleChange = (eventContext, event) => {
    const {
      allOption,
      allowSelectAll,
      getSelectValue,
      groupValueKey,
      isAllSelected,
      labelKey,
      onChange,
      optionDisabledKey,
      options,
      sort,
      value,
      valueKey
    } = this.props

    const option = eventContext.value

    if (option === null) {
      if (onChange) {
        onChange([])
      }
      return
    }

    let newValues = []
    const getVal = (val) => getSelectValue({ options, valueKey, value: val })
    const valueObjs = value.map((val) => getVal(val)).filter((val) => val)
    const isGroup = Array.isArray(option.options)
    const valKey = isGroup ? groupValueKey : valueKey
    const containsVal = valueObjs.some((val) => val[valKey] === option[valKey])
    const flatOptions = flattenOptions(options, allowSelectAll, allOption)

    if (containsVal) {
      newValues =
        option[valueKey] === allOption[valueKey]
          ? []
          : valueObjs.filter((val) =>
              allowSelectAll
                ? val[valKey] !== option[valKey] && val[valueKey] !== allOption[valueKey]
                : val[valKey] !== option[valKey]
            )
    } else if (isGroup) {
      newValues = [...valueObjs, ...option.options.filter((val) => !val[optionDisabledKey])]
    } else if (option[valueKey] === allOption[valueKey]) {
      newValues = flatOptions
    } else {
      newValues = [...valueObjs, option]
    }

    const allSelected = isAllSelected
      ? isAllSelected(newValues)
      : newValues.length === options.length - 1

    // Check the 'Select All' checkbox if all other values in the dropdown are selected
    if (!containsVal && allowSelectAll && allSelected) {
      newValues = [...flatOptions]
    }

    if (sort) {
      newValues = newValues.map((v) => v).sort(sortBy(labelKey))
    }

    if (onChange) {
      const newEventContext = { ...eventContext, value: newValues }
      onChange(newEventContext, event)
    }
  }

  render() {
    const {
      allOption,
      allowSelectAll,
      inputValue,
      optionGroupRenderer,
      optionRenderer,
      options,
      valueLabelLimit,
      valueGroupRenderer,
      valueKey
    } = this.props
    const { onChange, ...multiSelectProps } = this.props
    const ValGroupRenderer = valueGroupRenderer || ValueGroupRenderer
    const OptRenderer = optionRenderer || OptionRenderer
    const OptGroupRenderer = optionGroupRenderer || OptionGroupRenderer

    let opts = options
    if (
      inputValue === '' &&
      allowSelectAll &&
      options.every((o) => o[valueKey] !== allOption[valueKey])
    ) {
      opts.unshift(allOption)
    } else if (!allowSelectAll && options.some((o) => o[valueKey] === allOption[valueKey])) {
      opts = options.filter((val) => val[valueKey] !== allOption[valueKey])
    }

    return (
      <SimpleSelect
        {...multiSelectProps}
        isMulti
        options={opts}
        onChange={this.handleChange}
        optionRenderer={OptRenderer}
        optionGroupRenderer={OptGroupRenderer}
        // TODO: optimize with useCallback after dropping support for React < 16.8
        // eslint-disable-next-line react/no-unstable-nested-components
        valueGroupRenderer={(props) => (
          <ValGroupRenderer {...props} valueLabelLimit={valueLabelLimit} />
        )}
      />
    )
  }
}

MultiSelect.propTypes = {
  ...multiSelectPropTypes
}
MultiSelect.defaultProps = {
  ...multiSelectDefaults
}

export default MultiSelect
