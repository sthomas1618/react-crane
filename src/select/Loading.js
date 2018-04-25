import React from 'react'
import PropTypes from 'prop-types'

const Loading = (props) => {
  if (!props.isLoading) {
    return null
  }

  const renderer = props.loadingRenderer
    ? props.loadingRenderer({ isLoading: props.isLoading })
    : <div className="crane-select-loading" />

  return (
    <div className="crane-select-loading-container">{renderer}</div>
  )
}

Loading.propTypes = {
  loadingRenderer: PropTypes.func,
  isLoading: PropTypes.bool.isRequired
}

Loading.defaultProps = {
  loadingRenderer: null
}

export default Loading
