import React from 'react'
import PropTypes from 'prop-types'

function Arrow({ arrowRenderer, isOpen, onArrowClick, onArrowTouchEnd }) {
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

Arrow.propTypes = {
  arrowRenderer: PropTypes.func,
  onArrowClick: PropTypes.func.isRequired,
  onArrowTouchEnd: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
}

Arrow.defaultProps = {
  isOpen: false,
  arrowRenderer: null
}

export default Arrow
