import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ValueGroup extends Component {
  static propTypes = {
    clearInputOnSelect: PropTypes.bool,
    inputValue: PropTypes.string,
    labelKey: PropTypes.string,
    onMouseDown: PropTypes.func,
    placeholder: PropTypes.string,
    showInput: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    valueComponent: PropTypes.func,
    valueGroupRenderer: PropTypes.func
  }

  static defaultProps = {
    clearInputOnSelect: true,
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
      clearInputOnSelect,
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

    const renderer = clearInputOnSelect && showValue
      ? <ValueRenderer {...rendererProps} />
      : <span className="crane-select-placeholder">{placeholder}</span>

    return <div className="crane-select-value-group">{renderer}</div>
  }
}

export default ValueGroup
