import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  static propTypes = {
    getRef: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired
  }

  static defaultProps = {
    inputValue: ''
  }

  render() {
    const {
      getRef,
      inputValue,
      onBlur,
      onChange,
      onFocus
    } = this.props
    return (
      <div className="crane-select-input">
        <input
          aria-label="select input"
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={getRef}
          type="text"
          value={inputValue}
        />
      </div>
    )
  }
}

export default Input
