import React from 'react'

import { ArrowProps } from './typeDefs'

function Arrow({ arrowRenderer, isOpen = false, onArrowClick, onArrowTouchEnd }: ArrowProps) {
  const renderer = arrowRenderer ? (
    arrowRenderer({ isOpen })
  ) : (
    <span className="crane-select-arrow" />
  )

  const label = isOpen ? 'collapse' : 'expand'

  return (
    <div
      aria-label={label}
      role="button"
      tabIndex={-1}
      className="crane-select-arrow-container"
      onMouseDown={onArrowClick}
      onTouchEnd={onArrowTouchEnd}
    >
      {renderer}
    </div>
  )
}

export default Arrow
