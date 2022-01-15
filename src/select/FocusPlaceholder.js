import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FocusPlaceholder extends PureComponent {
  render() {
    const { onBlur, onFocus, getRef } = this.props

    return (
      <input
        aria-label="placeholder text"
        className="crane-select-focus-placeholder"
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly
        ref={getRef}
      />
    )
  }
}

FocusPlaceholder.propTypes = {
  getRef: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

export default FocusPlaceholder
