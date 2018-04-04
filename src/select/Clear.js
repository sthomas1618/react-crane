import React from 'react'
import PropTypes from 'prop-types'

const Clear = (props) => {
  if (props.disabled) {
    return null
  }

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
  clearRenderer: PropTypes.func,
  disabled: PropTypes.bool,
  onClearClick: PropTypes.func.isRequired,
  onClearTouchEnd: PropTypes.func.isRequired
}

Clear.defaultProps = {
  clearRenderer: null,
  disabled: false
}

export default Clear
