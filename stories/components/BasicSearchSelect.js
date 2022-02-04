import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SearchSelect } from '../../src'

class BasicSearchSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.value })
  }

  render() {
    const { labelKey, options } = this.props
    const { inputValue } = this.state
    let filteredOptions = [...options]

    if (inputValue) {
      filteredOptions = filteredOptions.filter((option) => {
        const text = option[labelKey]
        return text.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      })
    }

    return (
      <SearchSelect
        {...this.props}
        options={filteredOptions}
        onInputChange={this.handleInputChange}
        inputValue={inputValue}
      />
    )
  }
}

BasicSearchSelect.propTypes = {
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired
}

export default BasicSearchSelect
