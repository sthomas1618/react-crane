import _ from 'lodash'
import React, { Component } from 'react'
import PropType from 'prop-types'

import SimpleSelect from '../SimpleSelect'
import OptionRenderer from './OptionRenderer'
import ValueGroupRenderer from './ValueGroupRenderer'

class MultiSelect extends Component {
  static propTypes = {
    autoCloseMenu: PropType.bool,
    value: PropType.array,
    onChange: PropType.func,
    labelKey: PropType.string,
    valueKey: PropType.string,
    valueLabelLimit: PropType.number
  }

  static defaultProps = {
    autoCloseMenu: false,
    value: [],
    onChange: null,
    labelKey: 'label',
    valueKey: 'value',
    valueLabelLimit: 3
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
    const { value, labelKey, valueKey } = this.props

    const containsVal = _.some(value, val => (val[valueKey] === option[valueKey]))

    if (containsVal) {
      newValues = _.filter(value, val => (val[valueKey] !== option[valueKey]))
    } else {
      newValues = [...value, option]
    }

    newValues = _.sortBy(newValues, val => (val[labelKey]))

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
