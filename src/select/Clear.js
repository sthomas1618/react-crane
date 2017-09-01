import React from 'react'
import PropType from 'prop-types'

const Clear = (props) => {
  const renderer = props.clearRenderer
    ? props.clearRenderer()
    : <span className="crane-select-clear">&times;</span>

  return (
    <div
      role="button"
      tabIndex={-1}
      className="crane-select-clear-container"
      onMouseDown={props.onClearClick}
      onTouchEnd={props.onClearTouchEnd}
    >
      {renderer}
    </div>
  )
}

Clear.propTypes = {
  clearRenderer: PropType.func,
  onClearClick: PropType.func.isRequired,
  onClearTouchEnd: PropType.func.isRequired
}

Clear.defaultProps = {
  clearRenderer: null
}

export default Clear
