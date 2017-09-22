import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SearchSelect } from '../../src'

class BasicSearchSelect extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    labelKey: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.value })
  }

  render() {
    let options = [...this.props.options]

    if (this.state.inputValue) {
      options = options.filter((option) => {
        const text = option[this.props.labelKey]
        return text.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) > -1
      })
    }

    return (
      <SearchSelect
        {...this.props}
        options={options}
        onInputChange={this.onInputChange}
        inputValue={this.state.inputValue}
      />
    )
  }
}

export default BasicSearchSelect
