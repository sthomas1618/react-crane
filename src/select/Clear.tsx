import React from 'react'

import { ClearProps } from './typeDefs'

function Clear({ clearRenderer, disabled = false, onClearClick, onClearTouchEnd }: ClearProps) {
  if (disabled) {
    return null
  }

  const renderer = clearRenderer ? (
    clearRenderer({ disabled })
  ) : (
    <span className="crane-select-clear">&times;</span>
  )

  return (
    <div
      role="button"
      tabIndex={-1}
      className="crane-select-clear-container"
      onMouseDown={onClearClick}
      onTouchEnd={onClearTouchEnd}
    >
      {renderer}
    </div>
  )
}

export default Clear
