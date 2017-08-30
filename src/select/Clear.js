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
    >
      {renderer}
    </div>
  )
}

Clear.propTypes = {
  clearRenderer: PropType.func,
  onClearClick: PropType.func
}

Clear.defaultProps = {
  clearRenderer: null,
  onClearClick: null
}

export default Clear
