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

  onChange = (option) => {
    this.setState({ value: option })
  }

  onInputChange = (inputValue) => {
    this.setState({ inputValue })
  }

  render() {
    return (
      <SimpleSelect
        {...this.props}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        value={this.state.value}
        inputValue={this.state.inputValue}
      />
    )
  }
}

export default BasicSelect
