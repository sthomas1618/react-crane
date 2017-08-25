import React, { Component } from 'react'
import PropType from 'prop-types'

class Input extends Component {
  static propTypes = {
    ariaControls: PropType.string.isRequired,
    ariaExpanded: PropType.string.isRequired,
    getRef: PropType.func.isRequired,
    inputValue: PropType.string,
    onBlur: PropType.func.isRequired,
    onChange: PropType.func.isRequired,
    onFocus: PropType.func.isRequired
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
