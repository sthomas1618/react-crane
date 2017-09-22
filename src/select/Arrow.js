import React from 'react'
import PropTypes from 'prop-types'

const Arrow = (props) => {
  const renderer = props.arrowRenderer
    ? props.arrowRenderer({ isOpen: props.isOpen })
    : <span className="crane-select-arrow" />

  return (
    <div
      role="button"
      tabIndex={-1}
      className="crane-select-arrow-container"
      onMouseDown={props.onArrowClick}
      onTouchEnd={props.onArrowTouchEnd}
    >
      {renderer}
    </div>
  )
}

Arrow.propTypes = {
  arrowRenderer: PropTypes.func,
  onArrowClick: PropTypes.func.isRequired,
  onArrowTouchEnd: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

Arrow.defaultProps = {
  arrowRenderer: null
}

export default Arrow
