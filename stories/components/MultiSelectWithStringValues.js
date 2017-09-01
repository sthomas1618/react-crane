import React, { Component } from 'react'
import PropType from 'prop-types'

import { MultiSelect } from '../../src'

class MultiSelectWithStringValues extends Component {
  static propTypes = {
    valueKey: PropType.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      value: []
    }
  }

  onChange = (event) => {
    this.setState({ value: event.value.map(val => (val[this.props.valueKey])) })
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

export default MultiSelectWithStringValues
