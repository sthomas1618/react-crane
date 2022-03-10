import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FocusPlaceholder extends PureComponent {
  render() {
    const { onBlur, onFocus, getRef, id, ...ariaProps } = this.props

    return (
      <input
        id={id}
        aria-activedescendant={ariaProps['aria-activedescendant'] || undefined}
        aria-controls={ariaProps['aria-controls'] || undefined}
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
  'aria-activedescendant': PropTypes.string,
  'aria-controls': PropTypes.string,
  getRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

FocusPlaceholder.defaultProps = {
  'aria-activedescendant': undefined,
  'aria-controls': undefined
}

export default FocusPlaceholder
