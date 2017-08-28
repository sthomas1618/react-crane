import _ from 'lodash'
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
    valueComponent: PropType.func,
    valueGroupRenderer: PropType.func
  }

  static defaultProps = {
    inputValue: '',
    labelKey: '',
    onMouseDown: null,
    placeholder: '',
    showInput: false,
    value: null,
    valueComponent: null,
    valueGroupRenderer: null
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
      value,
      valueComponent,
      valueGroupRenderer
    } = this.props
    const ValueRenderer = valueGroupRenderer || valueComponent

    if (showInput && inputValue) {
      return null
    }

    const rendererProps = _.omit(this.props, 'valueGroupRenderer', 'placeholder')

    const renderer = value
      ? <ValueRenderer {...rendererProps} />
      : <span className="crane-select-placeholder">{placeholder}</span>

    return <div className="crane-select-value-group">{renderer}</div>
  }
}

export default Value
