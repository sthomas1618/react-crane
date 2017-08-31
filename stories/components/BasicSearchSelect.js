import React, { Component } from 'react'

import { SearchSelect } from '../../src'

class BasicSearchSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  onInputChange = (inputValue) => {
    this.setState({ inputValue })
  }

  render() {
    return (
      <SearchSelect
        {...this.props}
        onInputChange={this.onInputChange}
        inputValue={this.state.inputValue}
      />
    )
  }
}

export default BasicSearchSelect
