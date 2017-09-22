import Arrow from '../Arrow'
import Clear from '../Clear'
import FocusPlaceholder from '../FocusPlaceholder'
import Input from '../Input'
import Menu from '../Menu'
import Option from '../Option'
import Value from '../Value'
import ValueGroup from '../ValueGroup'

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

export const multiSelectDefaults = {
  ...simpleSelectDefaults,
  autoCloseMenu: false,
  value: [],
  valueLabelLimit: 3
}

