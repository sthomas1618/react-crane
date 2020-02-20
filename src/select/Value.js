import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Value extends Component {
  static propTypes = {
    getLabel: PropTypes.func.isRequired,
    labelKey: PropTypes.string.isRequired,
    option: PropTypes.object,
    valueRenderer: PropTypes.func
  }

  static defaultProps = {
    option: null,
    valueRenderer: null
  }

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

export default Value
