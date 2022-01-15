import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FilterSelect } from '../../src'

class BasicFilterSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null
    }
  }

  onChange = (event) => {
    this.setState({ value: event.value })
  }

  render() {
    const { value } = this.state
    return <FilterSelect {...this.props} onChange={this.onChange} value={value} />
  }
}

BasicFilterSelect.propTypes = {
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired
}

export default BasicFilterSelect
