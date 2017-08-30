import React from 'react'
import PropType from 'prop-types'

const Arrow = (props) => {
  const renderer = props.arrowRenderer || <span className="crane-select-arrow" />

  return (
    <div
      role="button"
      tabIndex={-1}
      className="crane-select-arrow-container"
      onMouseDown={props.onArrowClick}
    >
      {renderer}
    </div>
  )
}

Arrow.propTypes = {
  arrowRenderer: PropType.func,
  onArrowClick: PropType.func
}

Arrow.defaultProps = {
  arrowRenderer: null,
  onArrowClick: null
}

export default Arrow
