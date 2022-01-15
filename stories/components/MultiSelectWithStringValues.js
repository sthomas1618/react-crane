import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MultiSelect } from '../../src'

class MultiSelectWithStringValues extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: []
    }
  }

  onChange = (event) => {
    const { valueKey } = this.props
    this.setState({ value: event.value.map((val) => val[valueKey]) })
  }

  render() {
    const { value } = this.state
    return <MultiSelect {...this.props} onChange={this.onChange} value={value} />
  }
}

MultiSelectWithStringValues.propTypes = {
  valueKey: PropTypes.string.isRequired
}

export default MultiSelectWithStringValues
