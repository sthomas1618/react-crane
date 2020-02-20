import React, { Component } from 'react'

import SimpleSelect from './SimpleSelect'

import { filterSelectPropTypes, filterSelectDefaults, getSelectValue } from './utils'

class FilterSelect extends Component {
  static propTypes = {
    ...filterSelectPropTypes
  }

  static defaultProps = {
    ...filterSelectDefaults
  }

  constructor(props) {
    super(props)

    this.state = { inputValue: '' }
  }

  onInputChange = (eventContext, event) => {
    this.setState({ inputValue: eventContext.value })

    if (this.props.onInputChange) {
      this.props.onInputChange(eventContext, event)
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
    const {
      inputValue,
      filterOptions,
      options,
      onInputChange,
      ...selectProps
    } = this.props
    const currentInputValue = inputValue || this.state.inputValue
    const filteredOptions = filterOptions(this.props.options, currentInputValue, this.props)

    return (
      <SimpleSelect
        {...selectProps}
        options={filteredOptions}
        inputValue={currentInputValue}
        onInputChange={this.onInputChange}
        getSelectValue={this.getSelectValue}
        showInput
      />
    )
  }
}

export default FilterSelect
