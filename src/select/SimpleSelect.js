import React, { Component } from 'react'
import classNames from 'classnames'

import {
  flattenOptions,
  instructionsAriaMessage,
  isSelected,
  resultsAriaMessage,
  simpleSelectDefaults,
  simpleSelectProps,
  sortBy,
  valueEventAriaMessage
} from './utils'

// credit to https://github.com/JedWatson/react-select for many patterns and techniques used here
class SimpleSelect extends Component {
  static propTypes = {
    ...simpleSelectProps
  }

  static defaultProps = {
    ...simpleSelectDefaults
  }

  constructor(props) {
    super(props)

    this.state = {
      ariaLiveContext: '',
      ariaLiveSelection: '',
      isOpen: false,
      isFocused: false
    }

    this.optionRefs = []
  }

  componentDidUpdate(prevProps, prevState) {
    const prevIsOpen = prevProps.isOpen || prevState.isOpen
    const isOpen = this.props.isOpen || this.state.isOpen

    if (!prevIsOpen && isOpen && this.state.focusedOption && this.menuRef) {
      const { valueKey } = this.props
      const key = this.state.focusedOption[valueKey]
      const optionNode = this.optionRefs[key]

      if (optionNode) {
        this.menuRef.scrollTop = optionNode.offsetTop
      }
    }

    if (prevIsOpen !== isOpen) {
      const eventProp = isOpen ? this.onMenuOpen : this.onMenuClose

      if (eventProp) {
        eventProp()
      }
    }
  }

  onMenuOpen = () => {
    const { onOpen } = this.props

    this.announceAriaLiveContext('menu', null)

    if (onOpen) {
      onOpen()
    }
  }

  onMenuClose = () => {
    const { onClose } = this.props

    this.announceAriaLiveContext('input', null)

    if (onClose) {
      onClose()
    }
  }

  onValueTouchEnd = (event) => {
    this.onValueMouseDown(event)
  }

  onValueMouseDown = (event) => {
    if (this.isSecondayClick(event)) {
      return
    }

    const {
      disabled,
      isOpen,
      showInput,
      openOnClick,
      openOnEmptyInput,
      inputValue
    } = this.props

    if (disabled) {
      return
    }

    const setOpen = isOpen || (openOnClick && (showInput ? true : !this.state.isOpen))

    event.stopPropagation()

    if (event.target.tagName !== 'INPUT') {
      event.preventDefault()
    }

    this.focus()

    if (!showInput) {
      this.setState({ isOpen: setOpen })
      return
    }

    const openInput = openOnClick && (openOnEmptyInput || inputValue)

    // thanks https://github.com/JedWatson/react-select/blob/master/src/Select.js#L238
    if (this.state.isFocused) {
      // clears the value so that the cursor will be at the end of input this re-renders
      this.input.value = ''

      // if the input is focused, ensure the menu is open
      this.setState({
        isOpen: !!openInput,
        isOuterFocused: false
      })
    } else {
      this.setState({ isOpen: !!openInput })
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
    const {
      disabled,
      isMulti,
      isSearchable,
      name,
      onFocus
    } = this.props

    if (disabled) {
      return
    }

    if (onFocus) {
      onFocus({ name }, event)
    }

    const isOpen = this.props.isOpen || this.state.isOpen

    this.announceAriaLiveContext(
      'input',
      { isSearchable, isMulti, label: this.props['aria-label'] }
    )

    this.setState({
      isOpen,
      isFocused: true
    })
  }

  onInputChange = (event) => {
    const newInputValue = event.target.value
    const { disabled, inputValue, openOnEmptyInput } = this.props

    if (inputValue === newInputValue || disabled) {
      return
    }

    const isOpen = openOnEmptyInput || newInputValue

    this.setState({
      isOpen: !!isOpen,
      isOuterFocused: false
    })

    this.setInputValue(event, newInputValue)
  }

  onKeyDown = (event) => {
    const { disabled, inputValue, onKeyDown } = this.props

    if (disabled) {
      return
    }

    if (onKeyDown) {
      onKeyDown(event)

      if (event.defaultPrevented) {
        return
      }
    }

    switch (event.keyCode) {
      case 9:
        // tab
        if (event.shiftKey || !this.state.isOpen) {
          return
        }
        this.selectFocusedOption(event)
        return
      case 13:
        // enter
        if (!this.state.isOpen) {
          return
        }

        event.stopPropagation()
        this.selectFocusedOption(event)
        break
      case 27:
        // escape
        if (this.state.isOpen) {
          event.stopPropagation()
          this.closeMenu()
        }
        break
      case 32:
        // space
        if (!this.state.isOpen || inputValue) {
          return
        }
        this.selectFocusedOption(event)
        break
      case 38:
        // up
        this.focusOnOption('prev')
        break
      case 40:
        // down
        this.focusOnOption('next')
        break
      default: return
    }
    event.preventDefault()
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
    this.closeMenu()
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

    this.selectOption(event, option)
  }

  onOptionFocus = (event, option) => {
    const { labelKey, options } = this.props
    this.setState({ focusedOption: option })
    this.announceAriaLiveContext('focus', { focusedOption: option, labelKey, options })
  }

  setInputValue = (event, inputVal) => {
    if (this.props.onInputChange) {
      const eventContext = { name: this.props.name, value: inputVal }
      this.props.onInputChange(eventContext, event)
    }
  }

  getFocusedOption(direction, options) {
    const isOpen = this.props.isOpen || this.state.isOpen
    const {
      allowSelectAll,
      allOption,
      staticOption,
      valueKey
    } = this.props
    const { focusedOption } = this.state

    let flatOptions = flattenOptions(options, allowSelectAll, allOption)

    const multiStaticOptions = Array.isArray(staticOption)
    if (staticOption && !multiStaticOptions) {
      flatOptions = flattenOptions([...options, staticOption], allowSelectAll, allOption)
    } else if (staticOption && multiStaticOptions) {
      flatOptions = flattenOptions([...options, ...staticOption], allowSelectAll, allOption)
    }

    let currentIndex = focusedOption
      ? flatOptions.findIndex(option => (option[valueKey] === focusedOption[valueKey]))
      : -1

    if (!isOpen && currentIndex > -1) {
      currentIndex -= 1
    }

    switch (direction) {
      case 'prev':
        return currentIndex > 0 ? flatOptions[currentIndex - 1] :
          flatOptions[flatOptions.length - 1]
      case 'next':
        return currentIndex === flatOptions.length - 1 ? flatOptions[0] :
          flatOptions[currentIndex + 1]
      default:
        return null
    }
  }

  getIsSelected = (option) => {
    const { isMulti, value, valueKey } = this.props

    if (!isMulti) {
      return true
    }

    // If this returns true, then it was previously selected
    // and now it's unselected
    if (isSelected(option, value, valueKey)) {
      return false
    }
    return true
  }

  announceAriaLiveSelection = (event, context) => {
    this.setState({
      ariaLiveSelection: valueEventAriaMessage(event, context)
    })
  }

  announceAriaLiveContext = (event, context) => {
    this.setState({
      ariaLiveContext: instructionsAriaMessage(event, {
        ...context,
        label: this.props['aria-label']
      })
    })
  }

  focusOnOption = (direction) => {
    const { labelKey, options, staticOption } = this.props
    const newFocusedOption = options.length
      ? this.getFocusedOption(direction, options)
      : staticOption || null

    this.setState({
      isOpen: true,
      focusedOption: newFocusedOption
    }, () => { this.scrollToOption(newFocusedOption) })

    this.announceAriaLiveContext('focus', { focusedOption: newFocusedOption, labelKey, options })
  }

  selectOption = (event, option) => {
    const isOpen = !this.props.autoCloseMenu
    const newState = { isOpen, isOuterFocused: !isOpen && this.props.clearInputOnSelect }
    this.setState(newState, this.emitValueChange(option, event))
  }

  selectFocusedOption = (event) => {
    const { focusedOption } = this.state

    if (focusedOption) {
      this.selectOption(event, focusedOption)
    }
  }

  closeMenu = () => {
    const { isMulti, isSearchable } = this.props
    this.announceAriaLiveContext(
      'input',
      { isSearchable, isMulti }
    )
    this.setState({ isOpen: false }, this.focus)
  }

  scrollToOption = (option) => {
    if (!option || !this.menuRef) {
      return
    }

    const { valueKey } = this.props
    const key = option[valueKey]
    const optionNode = this.optionRefs[key]

    if (!optionNode) {
      return
    }

    const optionRect = optionNode.getBoundingClientRect()
    const menuRect = this.menuRef.getBoundingClientRect()

    if (optionRect.bottom > menuRect.bottom) {
      const totalHeight = optionNode.offsetTop + optionNode.clientHeight
      this.menuRef.scrollTop = (totalHeight - this.menuRef.offsetHeight)
    } else if (optionRect.top < menuRect.top) {
      this.menuRef.scrollTop = optionNode.offsetTop
    }
  }

  emitValueChange = (option, event) => {
    const {
      autoCloseMenu,
      clearInputOnSelect,
      getLabel,
      getSelectValue,
      inputValue,
      labelKey,
      name,
      onChange,
      onSelect,
      onStaticOptionClick,
      options,
      staticOption,
      value,
      valueKey
    } = this.props

    const multiStaticOptions = Array.isArray(staticOption)

    let isStatic = false
    if (staticOption && !multiStaticOptions) {
      isStatic = option[valueKey] === staticOption[valueKey]
    } else if (staticOption && multiStaticOptions) {
      isStatic = !!staticOption.find((o => option[valueKey] === o[valueKey]))
    }
    const eventContext = { name, value: option }

    if (isStatic && onStaticOptionClick) {
      onStaticOptionClick(eventContext, event)
    } else {
      if (onSelect) {
        onSelect(eventContext, event)
      }

      const hasOptions = options && options.length > 0
      const valueSelected = hasOptions && (option === null || value === null) && option !== value
      const selectValueProps = {
        options,
        value,
        valueKey
      }

      const valueObj = getSelectValue(selectValueProps)
      const valueChanged = (Array.isArray(value) && hasOptions)
        ? true
        : (hasOptions
          && (!valueObj || (value && option && valueObj[valueKey] !== option[valueKey])))

      if ((valueSelected || valueChanged) && onChange) {
        onChange(eventContext, event)
      }

      const newInputVal = !clearInputOnSelect && hasOptions && option !== null ? getLabel(option, labelKey) : ''
      if (newInputVal !== inputValue) {
        this.setInputValue(event, newInputVal)
      }

      if (valueChanged) {
        const announceEvent = this.getIsSelected(option) ? 'select-option' : 'deselect-option'
        this.announceAriaLiveSelection(
          announceEvent,
          { value: option[labelKey] }
        )
      }

      if (autoCloseMenu) {
        this.focus()
      }
    }
  }

  // check for right-clicks, etc
  isSecondayClick = event => (event.type === 'mousedown' && event.button !== 0)

  focus = () => { this.input.focus() }

  blur = () => { this.input.blur() }

  groupOptions() {
    const {
      allOption,
      allowSelectAll,
      inputValue,
      groups,
      groupByKey,
      options
    } = this.props

    if (groups && groups.length > 0 && groupByKey) {
      const orderedOptions = options.map(o => o).sort(sortBy(groupByKey))
      const parentGroups = []

      if (inputValue === '' && allowSelectAll && parentGroups.every(p => p !== allOption)) {
        parentGroups.push(allOption)
      }

      orderedOptions.forEach((option) => {
        const group = groups.find(g => g[groupByKey] === option[groupByKey])

        if (group) {
          if (!parentGroups.find(p => p === group)) {
            group.options = []
            parentGroups.push(group)
          }

          group.options.push(option)
        }
      })
      return parentGroups
    }
    return options
  }

  constructAriaLiveMessage() {
    const {
      ariaLiveContext
    } = this.state
    const {
      inputValue,
      options
    } = this.props
    // An aria live message representing the set of focusable results and
    // current searchterm/inputvalue.
    const count = options.length
    const screenMsg = `${count} result${count !== 1 ? 's' : ''} available`
    const resultsMsg = resultsAriaMessage(inputValue, screenMsg)

    return `${resultsMsg} ${ariaLiveContext}`
  }

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
    const {
      clearable,
      clearRenderer,
      disabled,
      value
    } = this.props
    const hasValue = Array.isArray(value) ? value.length : value

    if (!clearable || !hasValue) {
      return null
    }

    return (<ClearComponent
      clearRenderer={clearRenderer}
      disabled={disabled}
      onClearClick={this.onClearClick}
      onClearTouchEnd={this.onClearTouchEnd}
    />)
  }

  renderLoading() {
    const LoadingComponent = this.props.loadingComponent
    const { loadingRenderer, isLoading } = this.props

    return (<LoadingComponent
      loadingRenderer={loadingRenderer}
      isLoading={isLoading}
    />)
  }

  renderMenu() {
    const {
      isLoading,
      loadingText,
      noResultsText,
      staticOption
    } = this.props
    const { focusedOption } = this.state
    const {
      menuComponent,
      options,
      ...otherProps
    } = this.props
    const menuProps = {
      ...otherProps,
      onOptionClick: this.onOptionClick,
      onOptionFocus: this.onOptionFocus,
      optionRef: (el, key) => { this.optionRefs[key] = el },
      menuRef: (el) => { this.menuRef = el },
      focusedOption
    }

    const opts = this.groupOptions()

    let menu = null
    const hasStaticOptions =
      (Array.isArray(staticOption) && !!staticOption.length) || !!staticOption
    if (opts.length || hasStaticOptions) {
      const MenuComponent = this.props.menuComponent
      menu = (
        <div className="crane-select-menu-container" role="listbox">
          <MenuComponent {...menuProps} options={opts} />
        </div>
      )
    } else if (isLoading && loadingText) {
      menu = <div className="crane-select-loading-text">{loadingText}</div>
    } else if (!isLoading && noResultsText) {
      menu = <div className="crane-select-no-results">{noResultsText}</div>
    } else {
      menu = <div className="crane-select-empty-divider" />
    }

    return menu
  }

  // Used to announce updates to screen reader content
  renderLiveRegion() {
    if (!this.state.isFocused) return null
    return (
      <div className="sr-only" aria-live="polite">
        <p id="aria-selection-event">&nbsp;{this.state.ariaLiveSelection}</p>
        <p id="aria-context">&nbsp;{this.constructAriaLiveMessage()}</p>
      </div>
    )
  }

  renderInput() {
    const inputProps = {
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      //'aria-multiline': 'false',
      disabled: this.props.disabled,
      getRef: (ref) => { this.input = ref },
      id: this.props.inputId,
      inputValue: this.props.inputValue,
      onBlur: this.onInputBlur,
      onChange: this.onInputChange,
      onFocus: this.onInputFocus,
      //role: 'textbox'
    }
    const InputComponent = this.props.inputComponent

    return this.props.showInput
      ? <InputComponent {...inputProps} />
      : this.renderFocusPlaceholder(inputProps)
  }

  renderFocusPlaceholder(inputProps) {
    const FocusPlaceholderComponent = this.props.focusPlaceholderComponent
    const {
      onChange,
      inputValue,
      ...placeholderProps
    } = inputProps
    return <FocusPlaceholderComponent {...placeholderProps} />
  }

  render() {
    const {
      beforeInput,
      disabled,
      id,
      showValuesWhileFocused,
      valueGroupComponent
    } = this.props
    const { isFocused, isOuterFocused } = this.state
    const isOpen = this.props.isOpen || this.state.isOpen
    const {
      valueGroupComponent: _valueGroupComponent,
      ...valueGroupProps
    } = this.props
    const ValueGroupComponent = valueGroupComponent
    const selectClassName = classNames('crane-select', this.props.className, {
      open: isOpen, focus: isFocused, 'outer-focus': isOuterFocused, disabled
    })

    return (
      <div aria-expanded={isOpen} className={selectClassName} ref={(container) => { this.container = container }} role="combobox">
        <div
          className="crane-select-input-group"
          id={id}
          onKeyDown={this.onKeyDown}
          onMouseDown={this.onValueMouseDown}
          onTouchEnd={this.onValueTouchEnd}
        >
          {this.renderLiveRegion()}
          <div className="crane-select-outer-input">
            {beforeInput}
            <div className={showValuesWhileFocused ? 'crane-select-inner-input-flex' : 'crane-select-inner-input'}>
              <ValueGroupComponent isFocused={isFocused} {...valueGroupProps} />
              {this.renderInput()}
            </div>
          </div>
          {this.renderLoading()}
          {this.renderClear()}
          {this.renderArrow(isOpen)}
        </div>
        {isOpen && this.renderMenu()}
      </div>
    )
  }
}

export default SimpleSelect
