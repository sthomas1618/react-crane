import _ from 'lodash'
import React, { Component } from 'react'
import PropType from 'prop-types'

class ValueGroup extends Component {
  static propTypes = {
    autoClearInput: PropType.bool,
    inputValue: PropType.string,
    labelKey: PropType.string,
    onMouseDown: PropType.func,
    placeholder: PropType.string,
    showInput: PropType.bool,
    value: PropType.oneOfType([PropType.object, PropType.array, PropType.string]),
    valueComponent: PropType.func,
    valueGroupRenderer: PropType.func
  }

  static defaultProps = {
    autoClearInput: true,
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
      autoClearInput,
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
    const showValue = _.isArray(value) ? value.length : value

    const renderer = autoClearInput && showValue
      ? <ValueRenderer {...rendererProps} />
      : <span className="crane-select-placeholder">{placeholder}</span>

    return <div className="crane-select-value-group">{renderer}</div>
  }
}

export default ValueGroup
