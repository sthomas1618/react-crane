import React, { PureComponent } from 'react'

import { FocusPlaceholderProps } from './typeDefs'

class FocusPlaceholder extends PureComponent<FocusPlaceholderProps> {
  render() {
    const { onBlur, onFocus, getRef, id, ...ariaProps } = this.props

    return (
      <input
        id={id}
        aria-activedescendant={ariaProps['aria-activedescendant'] || undefined}
        aria-controls={ariaProps['aria-controls'] || undefined}
        aria-label="placeholder text"
        className="crane-select-focus-placeholder"
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly
        ref={getRef}
      />
    )
  }
}

export default FocusPlaceholder
