import _ from 'lodash'
import React, { Component } from 'react'

import SimpleSelect from '../SimpleSelect'
import OptionRenderer from './OptionRenderer'
import OptionGroupRenderer from './OptionGroupRenderer'
import ValueGroupRenderer from './ValueGroupRenderer'

import { flattenOptions, getSelectValue, multiSelectPropTypes, multiSelectDefaults } from '../utils'

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
    const { allOption,
      allowSelectAll,
      value,
      labelKey,
      valueKey,
      options,
      groupValueKey,
      sort } = this.props
    const getVal = val => (getSelectValue({ options, valueKey, value: val }))
    const valueObjs = value.map(val => (getVal(val))).filter(val => val)
    const isGroup = _.isArray(option.options)
    const valKey = isGroup ? groupValueKey : valueKey
    const containsVal = _.some(valueObjs, val => (val[valKey] === option[valKey]))
    const flatOptions = flattenOptions(options, allowSelectAll, allOption)

    if (containsVal) {
      newValues = option === allOption ? [] :
        _.filter(valueObjs, val => (allowSelectAll ?
          val[valKey] !== option[valKey] && val !== allOption : val[valKey] !== option[valKey]))
    } else if (isGroup) {
      newValues = [...valueObjs, ...option.options]
    } else if (option === allOption) {
      newValues = flatOptions
    } else {
      newValues = [...valueObjs, option]
    }

    // Check the 'Select All' checkbox if all other values in the dropdown are selected
    if (!containsVal && allowSelectAll && newValues.length === flatOptions.length - 1) {
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

  render() {
    const multiSelectProps = _.omit(this.props, 'onChange')
    const { allOption, allowSelectAll, options, valueLabelLimit, valueGroupRenderer } = this.props
    const Renderer = valueGroupRenderer || ValueGroupRenderer

    let opts = options
    if (allowSelectAll && !_.includes(options, allOption)) {
      opts.unshift(allOption)
    } else if (!allowSelectAll && _.includes(options, allOption)) {
      opts = _.filter(options, val => val !== allOption)
    }

    return (
      <SimpleSelect
        {...multiSelectProps}
        options={opts}
        onChange={this.onChange}
        showInput={false}
        optionRenderer={OptionRenderer}
        optionGroupRenderer={OptionGroupRenderer}
        valueGroupRenderer={props => (
          <Renderer {...props} valueLabelLimit={valueLabelLimit} />
        )}
      />
    )
  }
}

export default MultiSelect
