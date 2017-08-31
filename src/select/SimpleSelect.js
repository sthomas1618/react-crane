import _ from 'lodash'
import React, { Component } from 'react'
import PropType from 'prop-types'
import classNames from 'classnames'

import Arrow from './Arrow'
import Clear from './Clear'
import FocusPlaceholder from './FocusPlaceholder'
import Input from './Input'
import Menu from './Menu'
import Option from './Option'
import Value from './Value'
import ValueGroup from './ValueGroup'

import './select.scss'

// credit to https://github.com/JedWatson/react-select for many patterns and techniques used here
class SimpleSelect extends Component {
  static propTypes = {
    autoCloseMenu: PropType.bool,
    arrowComponent: PropType.func,
    arrowRenderer: PropType.func,
    clearable: PropType.bool,
    clearComponent: PropType.func,
    clearRenderer: PropType.func,
    focusPlaceholderComponent: PropType.func,
    inputComponent: PropType.func,
    inputValue: PropType.string,
    isOpen: PropType.bool,
    labelKey: PropType.string,
    menuComponent: PropType.func,
    onBlur: PropType.func,
    onChange: PropType.func,
    onFocus: PropType.func,
    onInputChange: PropType.func,
    optionComponent: PropType.func,
    optionRenderer: PropType.func,
    options: PropType.array,
    placeholder: PropType.string,
    showInput: PropType.bool,
    value: PropType.oneOfType([PropType.object, PropType.array]),
    valueComponent: PropType.func,
    valueRenderer: PropType.func,
    valueGroupComponent: PropType.func,
    valueGroupRenderer: PropType.func,
    valueKey: PropType.string
  }

  static defaultProps = {
    autoCloseMenu: PropType.bool,
    arrowComponent: Arrow,
    arrowRenderer: null,
    clearable: false,
    clearComponent: Clear,
    clearRenderer: null,
    focusPlaceholderComponent: FocusPlaceholder,
    inputComponent: Input,
    inputValue: '',
    isOpen: false,
    labelKey: 'label',
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

  componentDidMount() {
    document.addEventListener('touchstart', this.onDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.onDocumentClick, false)
  }

  onDocumentClick = (event) => {
    if (this.container && !this.container.contains(event.target)) {
      this.setState({ isOpen: false })
    }
  }

  onValueMouseDown = (event) => {
    if (this.isSecondayClick(event)) {
      return
    }

    const isOpen = this.props.isOpen || this.props.showInput ? true : !this.state.isOpen

    event.stopPropagation()
    event.preventDefault()

    this.focus()

    if (!this.props.showInput) {
      this.setState({ isOpen })
      return
    }

    // thanks https://github.com/JedWatson/react-select/blob/master/src/Select.js#L238
    if (this.state.isFocused) {
      // On iOS, we can get into a state where we think the input is focused but it isn't really,
      // since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
      // Call focus() again here to be safe.

      // clears the value so that the cursor will be at the end of input when the component re-renders
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
      this.props.onBlur(event)
    }

    this.setState({
      isOpen: false,
      isFocused: false,
      isOuterFocused: false
    })
  }

  onInputFocus = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus(event)
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
      if (this.props.onInputChange) {
        this.props.onInputChange(inputValue, event)
      }
    })
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

  onClearClick = (event) => {
    if (this.isSecondayClick(event)) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    this.setState({ isOpen: false, isOuterFocused: false }, this.emitValueChange(null))
  }

  onOptionClick = (event, option) => {
    if (this.isSecondayClick(event)) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    const isOpen = !this.props.autoCloseMenu
    const newState = { isOpen, isOuterFocused: !isOpen }
    this.setState(newState, this.emitValueChange(option))
  }

  emitValueChange = (option) => {
    const { value, valueKey } = this.props
    const valueSelected = (option === null || value === null) && option !== value
    const valueChanged = _.isArray(value)
      ? true
      : value && option && value[valueKey] !== option[valueKey]

    if ((valueSelected || valueChanged) && this.props.onChange) {
      this.props.onChange(option)
    }

    this.clearInputValue()

    if (this.props.autoCloseMenu) {
      this.focus()
    }
  }

  // check for right-clicks, etc
  isSecondayClick = event => (event.type === 'mousedown' && event.button !== 0)

  focus = () => { this.input.focus() }

  blur = () => { this.input.blur() }

  clearInputValue = (event) => {
    if (this.props.onInputChange) {
      this.props.onInputChange('', event)
    }
  }

  renderArrow() {
    const ArrowComponent = this.props.arrowComponent
    const { arrowRenderer } = this.props

    return <ArrowComponent arrowRenderer={arrowRenderer} onArrowClick={this.onArrowClick} />
  }

  renderClear() {
    const ClearComponent = this.props.clearComponent
    const { clearable, clearRenderer, value } = this.props
    const hasValue = _.isArray(value) ? value.length : value

    if (!clearable || !hasValue) {
      return null
    }

    return <ClearComponent clearRenderer={clearRenderer} onClearClick={this.onClearClick} />
  }

  renderMenu() {
    const {
      labelKey,
      optionComponent,
      optionRenderer,
      options,
      value,
      valueKey
    } = this.props
    const MenuComponent = this.props.menuComponent
    return (
      <div className="crane-select-menu-container">
        <MenuComponent
          labelKey={labelKey}
          onOptionClick={this.onOptionClick}
          optionComponent={optionComponent}
          optionRenderer={optionRenderer}
          options={options}
          value={value}
          valueKey={valueKey}
        />
      </div>
    )
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
    const {
      inputValue,
      labelKey,
      placeholder,
      showInput,
      value,
      valueComponent,
      valueGroupRenderer,
      valueRenderer
    } = this.props
    const ValueGroupComponent = this.props.valueGroupComponent
    const selectClassName = classNames('crane-select', {
      open: isOpen, focus: isFocused, 'outer-focus': isOuterFocused
    })

    return (
      <div className={selectClassName} ref={(container) => { this.container = container }}>
        <div
          className="crane-select-input-group"
          onMouseDown={this.onValueMouseDown}
          role="presentation"
        >
          <ValueGroupComponent
            inputValue={inputValue}
            labelKey={labelKey}
            placeholder={placeholder}
            showInput={showInput}
            value={value}
            valueRenderer={valueRenderer}
            valueComponent={valueComponent}
            valueGroupRenderer={valueGroupRenderer}
          />
          {this.renderInput(isOpen)}
          {this.renderClear()}
          {this.renderArrow()}
        </div>

        {isOpen && this.renderMenu()}
      </div>
    )
  }
}

export default SimpleSelect
