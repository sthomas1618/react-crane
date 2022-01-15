import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SimpleSelect from './SimpleSelect'

class SearchSelect extends Component {
  constructor(props) {
    super(props)

    this.state = { value: null }
  }

  onChange = (eventContext, event) => {
    this.setState({ value: eventContext.value })
    const { onChange } = this.props

    if (onChange) {
      onChange(eventContext, event)
    }
  }

  render() {
    const { onChange, ...selectProps } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const currentValue = this.props.value || this.state.value

    return (
      <SimpleSelect
        {...selectProps}
        value={currentValue}
        onChange={this.onChange}
        clearInputOnBlur={false}
        clearInputOnSelect={false}
        isSearchable
        showInput
      />
    )
  }
}

SearchSelect.propTypes = {
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

SearchSelect.defaultProps = {
  value: null,
  onChange: null
}

export default SearchSelect
