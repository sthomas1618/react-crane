import React, { Component } from 'react'
import PropType from 'prop-types'

class Value extends Component {
  static propTypes = {
    labelKey: PropType.string,
    value: PropType.object
  }

  static defaultProps = {
    labelKey: 'label',
    value: null
  }

  render() {
    const { value, labelKey } = this.props

    const label = value[labelKey]
    return <div>{label}</div>
  }
}

export default Value
