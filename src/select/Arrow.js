import React from 'react'
import PropType from 'prop-types'

const Arrow = (props) => {
  const renderer = props.arrowRenderer || <span className="crane-select-arrow" />

  return (
    <div className="crane-select-arrow-container">
      {renderer}
    </div>
  )
}

Arrow.propTypes = {
  arrowRenderer: PropType.func
}

Arrow.defaultProps = {
  arrowRenderer: null
}

export default Arrow
