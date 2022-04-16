import React from 'react'

import { LoadingProps } from './typeDefs'

function Loading({ isLoading = false, loadingRenderer }: LoadingProps) {
  if (!isLoading) {
    return null
  }

  const renderer = loadingRenderer ? (
    loadingRenderer({ isLoading })
  ) : (
    <div className="crane-select-loading" />
  )

  return <div className="crane-select-loading-container">{renderer}</div>
}

export default Loading
