import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SimpleSelect } from '../../src'

class SimpleSelectWithStringValue extends Component {
  static propTypes = {
    valueKey: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      value: null,
      inputValue: ''
    }
  }


  onChange = (event) => {
    this.setState({ value: event.value[this.props.valueKey] })
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.value })
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

export default SimpleSelectWithStringValue
