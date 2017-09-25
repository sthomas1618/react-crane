import _ from 'lodash'
import React, { Component } from 'react'

import SimpleSelect from './SimpleSelect'

import { filterSelectPropTypes, filterOptions } from './utils'

class FilterSelect extends Component {
  static propTypes = {
    ...filterSelectPropTypes
  }

  static defaultProps = {
    inputValue: null,
    onInputChange: null,
    filterOptions
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
        showInput
      />
    )
  }
}

export default FilterSelect
