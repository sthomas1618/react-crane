import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  static propTypes = {
    ariaControls: PropTypes.string.isRequired,
    ariaExpanded: PropTypes.string.isRequired,
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
      ariaControls,
      ariaExpanded,
      getRef,
      inputValue,
      onBlur,
      onChange,
      onFocus
    } = this.props
    return (
      <div className="crane-select-input">
        <input
          aria-controls={ariaControls}
          aria-label="select input"
          aria-expanded={ariaExpanded}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={getRef}
          role="combobox"
          type="text"
          value={inputValue}
        />
      </div>
    )
  }
}

export default Input
