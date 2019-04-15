import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../../src/select/utils'
import { MultiSelect } from '../../src'

class BasicMultiSelect extends Component {
  static propTypes = {
    allOption: PropTypes.object,
    allowSelectAll: PropTypes.bool,
    options: PropTypes.array.isRequired
  }

  static defaultProps = {
    allOption: {
      value: 'Select All',
      id: '*'
    },
    allowSelectAll: false
  }

  constructor(props) {
    super(props)

    this.state = {
      value: []
    }
  }

  onChange = (event) => {
    this.setState({ value: event.value })
  }

  isAllSelected = (values) => {
    const { allOption, allowSelectAll, options } = this.props
    const flatOpts = flattenOptions(options, allowSelectAll, allOption)
    return values.length === flatOpts.length - 1
  }

  render() {
    return (
      <MultiSelect
        {...this.props}
        isAllSelected={this.isAllSelected}
        onChange={this.onChange}
        value={this.state.value}
      />
    )
  }
}

export default BasicMultiSelect
