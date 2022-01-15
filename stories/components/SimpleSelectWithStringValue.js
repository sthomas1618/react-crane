import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SimpleSelect } from '../../src'

class SimpleSelectWithStringValue extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      inputValue: ''
    }
  }

  onChange = (event) => {
    const { valueKey } = this.props
    this.setState({ value: event.value[valueKey] })
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.value })
  }

  render() {
    const { value, inputValue } = this.state
    return (
      <SimpleSelect
        {...this.props}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        value={value}
        inputValue={inputValue}
      />
    )
  }
}

SimpleSelectWithStringValue.propTypes = {
  valueKey: PropTypes.string.isRequired
}

export default SimpleSelectWithStringValue
