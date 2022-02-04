import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../../src/select/utils'
import { MultiSelect } from '../../src'

class BasicMultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: []
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.value })
  }

  isAllSelected = (values) => {
    const { allOption, allowSelectAll, options } = this.props
    const flatOpts = flattenOptions(options, allowSelectAll, allOption)
    return values.length === flatOpts.length - 1
  }

  render() {
    const { value } = this.state
    return (
      <MultiSelect
        {...this.props}
        isAllSelected={this.isAllSelected}
        onChange={this.handleChange}
        value={value}
      />
    )
  }
}

BasicMultiSelect.propTypes = {
  allOption: PropTypes.object,
  allowSelectAll: PropTypes.bool,
  options: PropTypes.array.isRequired
}

BasicMultiSelect.defaultProps = {
  allOption: {
    value: 'Select All',
    id: '*'
  },
  allowSelectAll: false
}
export default BasicMultiSelect
