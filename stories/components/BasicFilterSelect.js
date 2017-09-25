import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FilterSelect } from '../../src'

class BasicFilterSelect extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    labelKey: PropTypes.string.isRequired
  }

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
    return (
      <FilterSelect
        {...this.props}
        onChange={this.onChange}
        value={this.state.value}
      />
    )
  }
}

export default BasicFilterSelect
