import React, { Component } from 'react'

import SimpleSelect from './SimpleSelect'

import { filterSelectPropTypes, getSelectValue } from './utils'
import { filterSelectDefaults } from './utils/DefaultProps'

class FilterSelect extends Component {
  constructor(props) {
    super(props)

    this.state = { inputValue: '' }
  }

  onInputChange = (eventContext, event) => {
    const { onInputChange } = this.props
    this.setState({ inputValue: eventContext.value })

    if (onInputChange) {
      onInputChange(eventContext, event)
    }
  }

  getSelectValue = (props) => {
    const { value, valueKey } = props
    const { options } = this.props
    const selectValueProps = {
      options,
      value,
      valueKey
    }
    return getSelectValue(selectValueProps)
  }

  render() {
    const { inputValue, filterOptions, options, onInputChange, ...selectProps } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const currentInputValue = this.props.inputValue || this.state.inputValue
    const filteredOptions = filterOptions(options, currentInputValue, this.props)

    return (
      <SimpleSelect
        {...selectProps}
        options={filteredOptions}
        inputValue={currentInputValue}
        isSearchable
        onInputChange={this.onInputChange}
        getSelectValue={this.getSelectValue}
        showInput
      />
    )
  }
}

FilterSelect.propTypes = {
  ...filterSelectPropTypes
}

FilterSelect.defaultProps = {
  ...filterSelectDefaults
}

export default FilterSelect
