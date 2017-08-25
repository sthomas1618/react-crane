import React, { Component } from 'react'
import PropType from 'prop-types'

class FocusPlaceholder extends Component {
  static propTypes = {
    ariaControls: PropType.string.isRequired,
    ariaExpanded: PropType.string.isRequired,
    getRef: PropType.func.isRequired,
    onBlur: PropType.func.isRequired,
    onFocus: PropType.func.isRequired
  }

  static defaultProps = {
    inputValue: ''
  }

  render() {
    const { onBlur, onFocus, ariaExpanded, ariaControls, getRef } = this.props

    return (
      <div
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        className="crane-select-focus-placeholder"
        onBlur={onBlur}
        onFocus={onFocus}
        ref={getRef}
        role="combobox"
        tabIndex={0}
      />
    )
  }
}

export default FocusPlaceholder
