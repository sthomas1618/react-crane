import React from 'react'
import PropType from 'prop-types'

const Clear = (props) => {
  const renderer = props.clearRenderer || <span className="crane-select-clear">&times;</span>

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
  onClearClick: PropType.func,
  onClearTouchEnd: PropType.func
}

Clear.defaultProps = {
  clearRenderer: null,
  onClearClick: null,
  onClearTouchEnd: null
}

export default Clear
