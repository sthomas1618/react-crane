import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FocusPlaceholder extends Component {
  static propTypes = {
    ariaControls: PropTypes.string.isRequired,
    ariaExpanded: PropTypes.string.isRequired,
    getRef: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired
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
