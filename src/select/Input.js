import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  getRef,
  id,
  inputValue,
  onBlur,
  onChange,
  onFocus,
  ...ariaProps
}) => (
  <div className="crane-select-input">
    <input
      id={id}
      aria-label={ariaProps['aria-label'] || undefined}
      aria-labelledby={ariaProps['aria-labelledby'] || undefined}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
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

Input.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  getRef: PropTypes.func.isRequired,
  id: PropTypes.string,
  inputValue: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

Input.defaultProps = {
  'aria-label': 'select input',
  'aria-labelledby': '',
  id: null,
  inputValue: ''
}

export default Input
