import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'

import Arrow from './Arrow'
import Clear from './Clear'
import FocusPlaceholder from './FocusPlaceholder'
import Input from './Input'
import Menu from './Menu'
import Option from './Option'
import Value from './Value'
import ValueGroup from './ValueGroup'

import { getSelectValue, simpleSelectProps } from './utils'

// credit to https://github.com/JedWatson/react-select for many patterns and techniques used here
class SimpleSelect extends Component {
  static propTypes = {
    ...simpleSelectProps
  }

  static defaultProps = {
    autoCloseMenu: true,
    arrowComponent: Arrow,
    arrowRenderer: null,
    className: null,
    clearable: false,
    clearComponent: Clear,
    clearInputOnBlur: true,
    clearInputOnSelect: true,
    clearRenderer: null,
    focusPlaceholderComponent: FocusPlaceholder,
    inputComponent: Input,
    inputValue: '',
    isOpen: false,
    labelKey: 'label',
    name: null,
    noResultsText: 'No Results Found',
    menuComponent: Menu,
    onBlur: null,
    onChange: null,
    onFocus: null,
    onInputChange: null,
    optionComponent: Option,
    optionRenderer: null,
    options: [],
    placeholder: 'Select value...',
    showInput: false,
    value: null,
    valueComponent: Value,
    valueRenderer: null,
    valueGroupComponent: ValueGroup,
    valueGroupRenderer: null,
    valueKey: 'value'
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isFocused: false
    }
  }

  onValueTouchEnd = (event) => {
    this.onValueMouseDown(event)
  }

  onValueMouseDown = (event) => {
    if (this.isSecondayClick(event)) {
      return
    }

    const isOpen = this.props.isOpen || this.props.showInput ? true : !this.state.isOpen

    event.stopPropagation()

    if (event.target.tagName !== 'INPUT') {
      event.preventDefault()
    }

    this.focus()

    if (!this.props.showInput) {
      this.setState({ isOpen })
      return
    }

    // thanks https://github.com/JedWatson/react-select/blob/master/src/Select.js#L238
    if (this.state.isFocused) {
      // clears the value so that the cursor will be at the end of input this re-renders
      this.input.value = ''

      // if the input is focused, ensure the menu is open
      this.setState({
        isOpen: true,
        isOuterFocused: false
      })
    } else {
      this.setState({ isOpen })
    }
  }

  onInputBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur({ name: this.props.name }, event)
    }

    if (this.props.clearInputOnBlur && this.props.inputValue) {
      this.setInputValue(event, '')
    }

    this.setState({
      isOpen: false,
      isFocused: false,
      isOuterFocused: false
    })
  }

  onInputFocus = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus({ name: this.props.name }, event)
    }

    const isOpen = this.props.isOpen || this.state.isOpen

    this.setState({
      isOpen,
      isFocused: true
    })
  }

  onInputChange = (event) => {
    const inputValue = event.target.value

    if (this.props.inputValue === inputValue) {
      return
    }

    this.setState({
      isOpen: true,
      isOuterFocused: false
    }, () => {
      this.setInputValue(event, inputValue)
    })
  }

  onArrowTouchEnd = (event) => {
    this.onArrowClick(event)
  }

  onArrowClick = (event) => {
    if (this.isSecondayClick(event)) {
      return
    }

    if (this.props.isOpen || !this.state.isOpen) {
      // let it bubble up
      return
    }

    event.stopPropagation()
    event.preventDefault()

    // we know we are closing menu
    this.setState({ isOpen: false }, this.focus)
  }

  onClearTouchEnd = (event) => {
    this.onClearClick(event)
  }

  onClearClick = (event) => {
    if (this.isSecondayClick(event)) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    this.setState({ isOpen: false, isOuterFocused: false }, this.emitValueChange(null, event))
  }

  onOptionClick = (event, option) => {
    if (this.isSecondayClick(event)) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    const isOpen = !this.props.autoCloseMenu
    const newState = { isOpen, isOuterFocused: !isOpen && this.props.clearInputOnSelect }
    this.setState(newState, this.emitValueChange(option, event))
  }

  setInputValue = (event, inputVal) => {
    if (this.props.onInputChange) {
      const eventContext = { name: this.props.name, value: inputVal }
      this.props.onInputChange(eventContext, event)
    }
  }

  emitValueChange = (option, event) => {
    const { clearInputOnSelect, value, valueKey, labelKey, inputValue } = this.props
    const valueSelected = (option === null || value === null) && option !== value
    const valueObj = getSelectValue(this.props)
    const valueChanged = _.isArray(value)
      ? true
      : value && option && valueObj[valueKey] !== option[valueKey]

    if ((valueSelected || valueChanged) && this.props.onChange) {
      const eventContext = { name: this.props.name, value: option }
      this.props.onChange(eventContext, event)
    }

    const newInputVal = !clearInputOnSelect && option !== null ? option[labelKey] : ''
    if (newInputVal !== inputValue) {
      this.setInputValue(event, newInputVal)
    }

    if (this.props.autoCloseMenu) {
      this.focus()
    }
  }

  // check for right-clicks, etc
  isSecondayClick = event => (event.type === 'mousedown' && event.button !== 0)

  focus = () => { this.input.focus() }

  blur = () => { this.input.blur() }

  renderArrow(isOpen) {
    const ArrowComponent = this.props.arrowComponent
    const { arrowRenderer } = this.props

    return (<ArrowComponent
      arrowRenderer={arrowRenderer}
      onArrowClick={this.onArrowClick}
      onArrowTouchEnd={this.onArrowTouchEnd}
      isOpen={isOpen}
    />)
  }

  renderClear() {
    const ClearComponent = this.props.clearComponent
    const { clearable, clearRenderer, value } = this.props
    const hasValue = _.isArray(value) ? value.length : value

    if (!clearable || !hasValue) {
      return null
    }

    return (<ClearComponent
      clearRenderer={clearRenderer}
      onClearClick={this.onClearClick}
      onClearTouchEnd={this.onClearTouchEnd}
    />)
  }

  renderMenu() {
    const { options, noResultsText } = this.props
    const menuProps = _.omit(this.props, 'menuComponent')

    let menu = null

    if (options.length) {
      const MenuComponent = this.props.menuComponent
      menu = (
        <div className="crane-select-menu-container">
          <MenuComponent {...menuProps} onOptionClick={this.onOptionClick} />
        </div>
      )
    } else if (noResultsText) {
      menu = <div className="crane-select-no-results">{noResultsText}</div>
    } else {
      menu = <div className="crane-select-empty-divider" />
    }

    return menu
  }

  renderInput(isOpen) {
    const inputProps = {
      // TODO implement static list of select ids
      ariaControls: '',
      ariaExpanded: isOpen ? 'true' : 'false',
      getRef: (ref) => { this.input = ref },
      inputValue: this.props.inputValue,
      onBlur: this.onInputBlur,
      onChange: this.onInputChange,
      onFocus: this.onInputFocus
    }
    const InputComponent = this.props.inputComponent

    return this.props.showInput
      ? <InputComponent {...inputProps} />
      : this.renderFocusPlaceholder(inputProps)
  }

  renderFocusPlaceholder(inputProps) {
    const FocusPlaceholderComponent = this.props.focusPlaceholderComponent
    const props = _.omit(inputProps, 'onChange', 'inputValue')
    return <FocusPlaceholderComponent {...props} />
  }

  render() {
    const { isFocused, isOuterFocused } = this.state
    const isOpen = this.props.isOpen || this.state.isOpen
    const valueGroupProps = _.omit(this.props, 'valueGroupComponent')
    const ValueGroupComponent = this.props.valueGroupComponent
    const selectClassName = classNames('crane-select', this.props.className, {
      open: isOpen, focus: isFocused, 'outer-focus': isOuterFocused
    })

    return (
      <div className={selectClassName} ref={(container) => { this.container = container }}>
        <div
          className="crane-select-input-group"
          onMouseDown={this.onValueMouseDown}
          onTouchEnd={this.onValueTouchEnd}
          role="presentation"
        >
          <ValueGroupComponent {...valueGroupProps} />
          {this.renderInput(isOpen)}
          {this.renderClear()}
          {this.renderArrow(isOpen)}
        </div>

        {isOpen && this.renderMenu()}
      </div>
    )
  }
}

export default SimpleSelect
