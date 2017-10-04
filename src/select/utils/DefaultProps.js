import Arrow from '../Arrow'
import Clear from '../Clear'
import FocusPlaceholder from '../FocusPlaceholder'
import Input from '../Input'
import Menu from '../Menu'
import Option from '../Option'
import Value from '../Value'
import ValueGroup from '../ValueGroup'

import filterOptions from './filterOptions'
import getSelectValue from './getSelectValue'

export const simpleSelectDefaults = {
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
  onKeyDown: null,
  onInputChange: null,
  openOnClick: true,
  openOnEmptyInput: true,
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
  valueKey: 'value',
  getSelectValue
}

export const multiSelectDefaults = {
  ...simpleSelectDefaults,
  autoCloseMenu: false,
  value: [],
  valueLabelLimit: 3
}

export const filterSelectDefaults = {
  ...simpleSelectDefaults,
  ignoreCase: true,
  filterOptions
}

