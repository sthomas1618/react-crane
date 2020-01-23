import _ from 'lodash'
import React, { Component } from 'react'

import SimpleSelect from '../SimpleSelect'
import OptionRenderer from './OptionRenderer'
import OptionGroupRenderer from './OptionGroupRenderer'
import ValueGroupRenderer from './ValueGroupRenderer'

import { flattenOptions, multiSelectPropTypes, multiSelectDefaults } from '../utils'

class MultiSelect extends Component {
  static propTypes = {
    ...multiSelectPropTypes
  }

  static defaultProps = {
    ...multiSelectDefaults
  }

  onChange = (eventContext, event) => {
    const option = eventContext.value

    if (option === null) {
      if (this.props.onChange) {
        this.props.onChange([])
      }
      return
    }

    let newValues = []
    const {
      allOption,
      allowSelectAll,
      getSelectValue,
      groupValueKey,
      isAllSelected,
      labelKey,
      options,
      sort,
      value,
      valueKey
    } = this.props
    const getVal = val => (getSelectValue({ options, valueKey, value: val }))
    const valueObjs = value.map(val => (getVal(val))).filter(val => val)
    const isGroup = Array.isArray(option.options)
    const valKey = isGroup ? groupValueKey : valueKey
    const containsVal = valueObjs.some(val => (val[valKey] === option[valKey]))
    const flatOptions = flattenOptions(options, allowSelectAll, allOption)

    if (containsVal) {
      newValues = option[valueKey] === allOption[valueKey] ? [] :
        _.filter(valueObjs, val => (
          allowSelectAll ? val[valKey] !== option[valKey] && val[valueKey] !== allOption[valueKey]
            : val[valKey] !== option[valKey]))
    } else if (isGroup) {
      newValues = [...valueObjs, ...option.options]
    } else if (option[valueKey] === allOption[valueKey]) {
      newValues = flatOptions
    } else {
      newValues = [...valueObjs, option]
    }

    const allSelected = isAllSelected ? isAllSelected(newValues)
      : newValues.length === options.length - 1

    // Check the 'Select All' checkbox if all other values in the dropdown are selected
    if (!containsVal && allowSelectAll && allSelected) {
      newValues = [...flatOptions]
    }

    if (sort) {
      newValues = _.sortBy(newValues, val => (_.isString(val) ? val : val[labelKey]))
    }

    if (this.props.onChange) {
      const newEventContext = { ...eventContext, value: newValues }
      this.props.onChange(newEventContext, event)
    }
  }

  blur = () => {
    this.simpleSelectRef.blur()
  }

  focus = () => {
    this.simpleSelectRef.focus()
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
    if (inputValue === '' && allowSelectAll && !_.some(options, allOption)) {
      opts.unshift(allOption)
    } else if (!allowSelectAll && _.some(options, allOption)) {
      opts = _.filter(options, val => val[valueKey] !== allOption[valueKey])
    }

    return (
      <SimpleSelect
        {...multiSelectProps}
        options={opts}
        onChange={this.onChange}
        optionRenderer={OptRenderer}
        optionGroupRenderer={OptGroupRenderer}
        valueGroupRenderer={props => (
          <ValGroupRenderer {...props} valueLabelLimit={valueLabelLimit} />
        )}
        ref={(ref) => { this.simpleSelectRef = ref }}
      />
    )
  }
}

export default MultiSelect
