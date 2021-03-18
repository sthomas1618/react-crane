import React from 'react'
import PropTypes from 'prop-types'

const Clear = ({
  clearRenderer,
  disabled,
  onClearClick,
  onClearTouchEnd
}) => {
  if (disabled) {
    return null
  }

  const renderer = clearRenderer
    ? clearRenderer({ disabled })
    : <span className="crane-select-clear">&times;</span>

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
