import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Value extends PureComponent {
  render() {
    const {
      labelKey,
      valueRenderer,
      option,
      getLabel
    } = this.props

    if (!option) {
      return null
    }

    const renderer = valueRenderer
      ? valueRenderer({ option, labelKey })
      : getLabel(option, labelKey)

    return <span>{renderer}</span>
  }
}

Value.propTypes = {
  getLabel: PropTypes.func.isRequired,
  labelKey: PropTypes.string.isRequired,
  option: PropTypes.object,
  valueRenderer: PropTypes.func
}

Value.defaultProps = {
  option: null,
  valueRenderer: null
}

export default Value
