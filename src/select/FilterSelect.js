import _ from 'lodash'
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
    const selectValueProps = {
      ...props,
      options: this.props.options
    }
    return getSelectValue(selectValueProps)
  }

  render() {
    const props = _.omit(this.props, 'onInputChange', 'options')
    const inputValue = this.props.inputValue || this.state.inputValue
    const options = this.props.filterOptions(this.props.options, inputValue, this.props)

    return (
      <SimpleSelect
        {...props}
        options={options}
        inputValue={inputValue}
        onInputChange={this.onInputChange}
        getSelectValue={this.getSelectValue}
        showInput
      />
    )
  }
}

export default FilterSelect
