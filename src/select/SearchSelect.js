import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SimpleSelect from './SimpleSelect'

class SearchSelect extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onInputChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string
    ])
  }

  static defaultProps = {
    value: null,
    onChange: null
  }

  constructor(props) {
    super(props)

    this.state = { value: null }
  }

  onChange = (eventContext, event) => {
    this.setState({ value: eventContext.value })

    if (this.props.onChange) {
      this.props.onChange(eventContext, event)
    }
  }

  render() {
    const {
      onChange,
      value,
      ...selectProps
    } = this.props
    const currentValue = value || this.state.value

    return (
      <SimpleSelect
        {...selectProps}
        value={currentValue}
        onChange={this.onChange}
        clearInputOnBlur={false}
        clearInputOnSelect={false}
        showInput
      />
    )
  }
}

export default SearchSelect
