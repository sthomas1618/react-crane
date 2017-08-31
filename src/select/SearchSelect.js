import _ from 'lodash'
import React, { Component } from 'react'
import PropType from 'prop-types'

import SimpleSelect from './SimpleSelect'

class SearchSelect extends Component {
  static propTypes = {
    value: PropType.object,
    inputValue: PropType.string.isRequired,
    onChange: PropType.func,
    onInputChange: PropType.func.isRequired
  }

  static defaultProps = {
    value: null,
    onChange: null
  }

  constructor(props) {
    super(props)

    this.state = { value: null }
  }

  onChange = (option) => {
    this.setState({ value: option })

    if (this.props.onChange) {
      this.props.onChange(option)
    }
  }

  render() {
    const props = _.omit(this.props, 'onChange')
    const value = this.props.value || this.state.value

    return (
      <SimpleSelect
        {...props}
        value={value}
        onChange={this.onChange}
        autoClearInput={false}
        showInput
      />
    )
  }
}

export default SearchSelect
