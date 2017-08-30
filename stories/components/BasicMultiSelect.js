import React, { Component } from 'react'

import { MultiSelect } from '../../src'

class BasicMultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: []
    }
  }

  onChange = (option) => {
    this.setState({ value: option })
  }

  render() {
    return (
      <MultiSelect
        {...this.props}
        onChange={this.onChange}
        value={this.state.value}
      />
    )
  }
}

export default BasicMultiSelect
