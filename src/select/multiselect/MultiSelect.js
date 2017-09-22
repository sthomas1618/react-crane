import _ from 'lodash'
import React, { Component } from 'react'

import SimpleSelect from '../SimpleSelect'
import OptionRenderer from './OptionRenderer'
import ValueGroupRenderer from './ValueGroupRenderer'

import { getSelectValue, multiSelectPropTypes } from '../utils'

class MultiSelect extends Component {
  static propTypes = {
    ...multiSelectPropTypes
  }

  static defaultProps = {
    autoCloseMenu: false,
    value: [],
    onChange: null,
    labelKey: 'label',
    valueKey: 'value',
    valueLabelLimit: 3,
    options: []
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
    const { value, labelKey, valueKey, options } = this.props
    const getVal = val => (getSelectValue({ options, valueKey, value: val }))
    const valueObjs = value.map(val => (getVal(val)))
    const containsVal = _.some(valueObjs, val => (val[valueKey] === option[valueKey]))

    if (containsVal) {
      newValues = _.filter(valueObjs, val => (val[valueKey] !== option[valueKey]))
    } else {
      newValues = [...valueObjs, option]
    }

    newValues = _.sortBy(newValues, val => (_.isString(val) ? val : val[labelKey]))

    if (this.props.onChange) {
      const newEventContext = { ...eventContext, value: newValues }
      this.props.onChange(newEventContext, event)
    }
  }

  render() {
    const multiSelectProps = _.omit(this.props, 'onChange')
    const { valueLabelLimit } = this.props

    return (
      <SimpleSelect
        {...multiSelectProps}
        onChange={this.onChange}
        showInput={false}
        optionRenderer={OptionRenderer}
        valueGroupRenderer={props => (
          <ValueGroupRenderer {...props} valueLabelLimit={valueLabelLimit} />
        )}
      />
    )
  }
}

export default MultiSelect
