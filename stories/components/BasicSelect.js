import React, { Component } from 'react'

import { SimpleSelect } from '../../src'

class BasicSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      inputValue: ''
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.value })
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.value })
  }

  render() {
    const { value, inputValue } = this.state
    return (
      <SimpleSelect
        {...this.props}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        value={value}
        inputValue={inputValue}
      />
    )
  }
}

export default BasicSelect
