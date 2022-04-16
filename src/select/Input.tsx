import React from 'react'

import { InputProps } from './typeDefs'

function Input({
  disabled = false,
  getRef,
  id,
  inputValue = '',
  onBlur,
  onChange,
  onFocus,
  ...ariaProps
}: InputProps) {
  return (
    <div className="crane-select-input">
      <input
        id={id}
        aria-activedescendant={ariaProps['aria-activedescendant'] || undefined}
        aria-controls={ariaProps['aria-controls'] || undefined}
        aria-label={ariaProps['aria-label'] || 'select input'}
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

export default Input
