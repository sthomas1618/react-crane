import React, { Component } from 'react'
import classNames from 'classnames'

import {
  flattenOptions,
  instructionsAriaMessage,
  resultsAriaMessage,
  simpleSelectPropTypes,
  sortBy,
  valueEventAriaMessage
} from './utils'
// import alone to avoid dep cycle
import isSelected from './utils/isSelected'
import { simpleSelectDefaults } from './utils/DefaultProps'

// credit to https://github.com/JedWatson/react-select for many patterns and techniques used here
class SimpleSelect extends Component {
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
    const { focusedOption } = this.state
    const prevIsOpen = prevProps.isOpen || prevState.isOpen
    // eslint-disable-next-line react/destructuring-assignment
    const isOpen = this.props.isOpen || this.state.isOpen

    if (!prevIsOpen && isOpen && focusedOption && this.menuRef) {
      const { valueKey } = this.props
      const key = focusedOption[valueKey]
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
    if (this.isSecondaryClick(event)) {
      return
    }

    const { disabled, isOpen, showInput, openOnClick, openOnEmptyInput, inputValue } = this.props

    if (disabled) {
      return
    }

    // eslint-disable-next-line react/destructuring-assignment
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
    const { isFocused } = this.state

    // thanks https://github.com/JedWatson/react-select/blob/master/src/Select.js#L238
    if (isFocused) {
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
    const { clearInputOnBlur, onBlur, name, inputValue } = this.props

    if (onBlur) {
      onBlur({ name }, event)
    }

    if (clearInputOnBlur && inputValue) {
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
      'aria-label': ariaLabel,
      disabled,
      isMulti,
      isOpen,
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

    this.announceAriaLiveContext('input', {
      isSearchable,
      isMulti,
      label: ariaLabel
    })

    this.setState((prevState) => ({
      isOpen: isOpen || prevState.isOpen,
      isFocused: true
    }))
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
    const { disabled, inputValue, onKeyDown, isOpen } = this.props

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
        if (event.shiftKey || !isOpen) {
          return
        }
        this.selectFocusedOption(event)
        return
      case 13:
        // enter
        if (!isOpen) {
          return
        }

        event.stopPropagation()
        this.selectFocusedOption(event)
        break
      case 27:
        // escape
        if (isOpen) {
          event.stopPropagation()
          this.closeMenu()
        }
        break
      case 32:
        // space
        if (!isOpen || inputValue) {
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
      default:
        return
    }
    event.preventDefault()
  }

  onArrowTouchEnd = (event) => {
    this.onArrowClick(event)
  }

  onArrowClick = (event) => {
    if (this.isSecondaryClick(event)) {
      return
    }

    // eslint-disable-next-line react/destructuring-assignment
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
    if (this.isSecondaryClick(event)) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    this.setState({ isOpen: false, isOuterFocused: false }, this.emitValueChange(null, event))
  }

  onOptionClick = (event, option) => {
    if (this.isSecondaryClick(event)) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    this.selectOption(event, option)
  }

  onOptionFocus = (event, option) => {
    const { labelKey, options } = this.props
    this.setState({ focusedOption: option })
    this.announceAriaLiveContext('focus', {
      focusedOption: option,
      labelKey,
      options
    })
  }

  setInputValue = (event, inputVal) => {
    const { onInputChange, name } = this.props

    if (onInputChange) {
      const eventContext = { name, value: inputVal }
      onInputChange(eventContext, event)
    }
  }

  getFocusedOption(direction, options) {
    // eslint-disable-next-line react/destructuring-assignment
    const isOpen = this.props.isOpen || this.state.isOpen
    const { allowSelectAll, allOption, staticOption, valueKey } = this.props
    const { focusedOption } = this.state

    let flatOptions = flattenOptions(options, allowSelectAll, allOption)

    const multiStaticOptions = Array.isArray(staticOption)
    if (staticOption && !multiStaticOptions) {
      flatOptions = flattenOptions([...options, staticOption], allowSelectAll, allOption)
    } else if (staticOption && multiStaticOptions) {
      flatOptions = flattenOptions([...options, ...staticOption], allowSelectAll, allOption)
    }

    let currentIndex = focusedOption
      ? flatOptions.findIndex((option) => option[valueKey] === focusedOption[valueKey])
      : -1

    if (!isOpen && currentIndex > -1) {
      currentIndex -= 1
    }

    switch (direction) {
      case 'prev':
        return currentIndex > 0
          ? flatOptions[currentIndex - 1]
          : flatOptions[flatOptions.length - 1]
      case 'next':
        return currentIndex === flatOptions.length - 1
          ? flatOptions[0]
          : flatOptions[currentIndex + 1]
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
    const { 'aria-label': ariaLabel } = this.props
    this.setState({
      ariaLiveContext: instructionsAriaMessage(event, {
        ...context,
        label: ariaLabel
      })
    })
  }

  focusOnOption = (direction) => {
    const { labelKey, options, staticOption } = this.props
    const newFocusedOption = options.length
      ? this.getFocusedOption(direction, options)
      : staticOption || null

    this.setState(
      {
        isOpen: true,
        focusedOption: newFocusedOption
      },
      () => {
        this.scrollToOption(newFocusedOption)
      }
    )

    this.announceAriaLiveContext('focus', {
      focusedOption: newFocusedOption,
      labelKey,
      options
    })
  }

  selectOption = (event, option) => {
    const { autoCloseMenu, clearInputOnSelect } = this.props
    const isOpen = !autoCloseMenu
    const newState = { isOpen, isOuterFocused: !isOpen && clearInputOnSelect }
    this.setState(newState, this.emitValueChange(option, event))
  }

  selectFocusedOption = (event) => {
    const { focusedOption } = this.state
    const { optionDisabledKey } = this.props

    if (focusedOption && !focusedOption[optionDisabledKey]) {
      this.selectOption(event, focusedOption)
    }
  }

  closeMenu = () => {
    const { isMulti, isSearchable } = this.props
    this.announceAriaLiveContext('input', { isSearchable, isMulti })
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
      this.menuRef.scrollTop = totalHeight - this.menuRef.offsetHeight
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
      isStatic = !!staticOption.find((o) => option[valueKey] === o[valueKey])
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
      const valueChanged =
        Array.isArray(value) && hasOptions
          ? true
          : hasOptions &&
            (!valueObj || (value && option && valueObj[valueKey] !== option[valueKey]))

      if ((valueSelected || valueChanged) && onChange) {
        onChange(eventContext, event)
      }

      const newInputVal =
        !clearInputOnSelect && hasOptions && option !== null ? getLabel(option, labelKey) : ''
      if (newInputVal !== inputValue) {
        this.setInputValue(event, newInputVal)
      }

      if (valueChanged) {
        const announceEvent = this.getIsSelected(option) ? 'select-option' : 'deselect-option'
        this.announceAriaLiveSelection(announceEvent, {
          value: option[labelKey]
        })
      }

      if (autoCloseMenu) {
        this.focus()
      }
    }
  }

  // check for right-clicks, etc
  isSecondaryClick = (event) => event.type === 'mousedown' && event.button !== 0

  focus = () => {
    this.input.focus()
  }

  groupOptions() {
    const { allOption, allowSelectAll, inputValue, groups, groupByKey, options } = this.props

    if (groups && groups.length > 0 && groupByKey) {
      const orderedOptions = options.map((o) => o).sort(sortBy(groupByKey))
      const parentGroups = []

      if (inputValue === '' && allowSelectAll && parentGroups.every((p) => p !== allOption)) {
        parentGroups.push(allOption)
      }

      orderedOptions.forEach((option) => {
        const group = groups.find((g) => g[groupByKey] === option[groupByKey])

        if (group) {
          if (!parentGroups.find((p) => p === group)) {
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
    const { ariaLiveContext } = this.state
    const { inputValue, options } = this.props
    // An aria live message representing the set of focusable results and
    // current searchterm/inputvalue.
    const count = options.length
    const screenMsg = `${count} result${count !== 1 ? 's' : ''} available`
    const resultsMsg = resultsAriaMessage(inputValue, screenMsg)

    return `${resultsMsg} ${ariaLiveContext}`
  }

  renderArrow(isOpen) {
    const { arrowComponent } = this.props
    const ArrowComponent = arrowComponent
    const { arrowRenderer } = this.props

    return (
      <ArrowComponent
        arrowRenderer={arrowRenderer}
        onArrowClick={this.onArrowClick}
        onArrowTouchEnd={this.onArrowTouchEnd}
        isOpen={isOpen}
      />
    )
  }

  renderClear() {
    const { clearComponent, clearable, clearRenderer, disabled, value } = this.props
    const ClearComponent = clearComponent
    const hasValue = Array.isArray(value) ? value.length : value

    if (!clearable || !hasValue) {
      return null
    }

    return (
      <ClearComponent
        clearRenderer={clearRenderer}
        disabled={disabled}
        onClearClick={this.onClearClick}
        onClearTouchEnd={this.onClearTouchEnd}
      />
    )
  }

  renderLoading() {
    const { loadingComponent, loadingRenderer, isLoading } = this.props
    const LoadingComponent = loadingComponent
    return <LoadingComponent loadingRenderer={loadingRenderer} isLoading={isLoading} />
  }

  renderMenu() {
    const { isLoading, loadingText, noResultsText, staticOption } = this.props
    const { focusedOption } = this.state
    const { menuComponent, options, ...otherProps } = this.props
    const menuProps = {
      ...otherProps,
      onOptionClick: this.onOptionClick,
      onOptionFocus: this.onOptionFocus,
      optionRef: (el, key) => {
        this.optionRefs[key] = el
      },
      menuRef: (el) => {
        this.menuRef = el
      },
      focusedOption
    }

    const opts = this.groupOptions()

    let menu = null
    const hasStaticOptions =
      (Array.isArray(staticOption) && !!staticOption.length) || !!staticOption
    if (opts.length || hasStaticOptions) {
      const MenuComponent = menuComponent
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
    const { ariaLiveSelection, isFocused } = this.state

    if (!isFocused) {
      return null
    }

    return (
      <div className="sr-only" aria-live="polite">
        <p id="aria-selection-event">{ariaLiveSelection}</p>
        <p id="aria-context">{this.constructAriaLiveMessage()}</p>
      </div>
    )
  }

  renderInput() {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      disabled,
      inputComponent,
      inputId,
      inputValue,
      showInput
    } = this.props

    const inputProps = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      disabled,
      getRef: (ref) => {
        this.input = ref
      },
      id: inputId,
      inputValue,
      onBlur: this.onInputBlur,
      onChange: this.onInputChange,
      onFocus: this.onInputFocus
    }
    const InputComponent = inputComponent

    return showInput ? <InputComponent {...inputProps} /> : this.renderFocusPlaceholder(inputProps)
  }

  renderFocusPlaceholder(inputProps) {
    const { focusPlaceholderComponent } = this.props
    const FocusPlaceholderComponent = focusPlaceholderComponent
    const { onChange, inputValue, ...placeholderProps } = inputProps
    return <FocusPlaceholderComponent {...placeholderProps} />
  }

  render() {
    const { beforeInput, className, disabled, id, showValuesWhileFocused, valueGroupComponent } =
      this.props
    const { isFocused, isOuterFocused } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    const isOpen = this.props.isOpen || this.state.isOpen
    const { valueGroupComponent: _valueGroupComponent, ...valueGroupProps } = this.props
    const ValueGroupComponent = valueGroupComponent
    const selectClassName = classNames('crane-select', className, {
      open: isOpen,
      focus: isFocused,
      'outer-focus': isOuterFocused,
      disabled
    })

    return (
      <div aria-expanded={isOpen} className={selectClassName}>
        <div
          className="crane-select-input-group"
          id={id}
          onKeyDown={this.onKeyDown}
          onMouseDown={this.onValueMouseDown}
          onTouchEnd={this.onValueTouchEnd}
          role="presentation"
        >
          {this.renderLiveRegion()}
          <div className="crane-select-outer-input">
            {beforeInput}
            <div
              aria-controls={isOpen ? 'crane-select-menu-container' : null}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={
                showValuesWhileFocused
                  ? 'crane-select-inner-input-flex'
                  : 'crane-select-inner-input'
              }
              role="combobox"
            >
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

SimpleSelect.propTypes = {
  ...simpleSelectPropTypes
}
SimpleSelect.defaultProps = {
  ...simpleSelectDefaults
}

export default SimpleSelect
