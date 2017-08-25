import React, { Component } from 'react'
import PropType from 'prop-types'

class Value extends Component {
  static propTypes = {
    inputValue: PropType.string,
    labelKey: PropType.string,
    onMouseDown: PropType.func,
    placeholder: PropType.string,
    showInput: PropType.bool,
    value: PropType.object,
    valueComponent: PropType.func
  }

  static defaultProps = {
    inputValue: '',
    labelKey: '',
    onMouseDown: null,
    placeholder: '',
    showInput: false,
    value: null,
    valueComponent: null
  }

  onMouseDown = (event) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(this.props.value, event)
    }
  }

  render() {
    const {
      inputValue,
      placeholder,
      showInput,
      value
    } = this.props
    const ValueComponent = this.props.valueComponent

    if (showInput && inputValue) {
      return null
    }

    const display = value
      ? <ValueComponent {...this.props} />
      : <span className="crane-select-placeholder">{placeholder}</span>

    return <div className="crane-select-value-group">{display}</div>
  }
}

export default Value
