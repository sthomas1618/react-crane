import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({
  isLoading,
  loadingRenderer
}) => {
  if (!isLoading) {
    return null
  }

  const renderer = loadingRenderer
    ? loadingRenderer({ isLoading })
    : <div className="crane-select-loading" />

  return (
    <div className="crane-select-loading-container">{renderer}</div>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  loadingRenderer: PropTypes.func
}

Loading.defaultProps = {
  isLoading: false,
  loadingRenderer: null
}

export default Loading
