import React from 'react'
import PropTypes from 'prop-types'

function Input({ disabled, getRef, id, inputValue, onBlur, onChange, onFocus, ...ariaProps }) {
  return (
    <div className="crane-select-input">
      <input
        id={id}
        aria-activedescendant={ariaProps['aria-activedescendant'] || undefined}
        aria-controls={ariaProps['aria-controls'] || undefined}
        aria-label={ariaProps['aria-label'] || undefined}
        aria-labelledby={ariaProps['aria-labelledby'] || undefined}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={getRef}
        spellCheck="false"
        type="text"
        value={inputValue}
      />
    </div>
  )
}

Input.propTypes = {
  'aria-activedescendant': PropTypes.string,
  'aria-controls': PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  disabled: PropTypes.bool,
  getRef: PropTypes.func.isRequired,
  id: PropTypes.string,
  inputValue: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

Input.defaultProps = {
  'aria-activedescendant': undefined,
  'aria-controls': undefined,
  'aria-label': 'select input',
  'aria-labelledby': undefined,
  disabled: false,
  id: null,
  inputValue: ''
}

export default Input
