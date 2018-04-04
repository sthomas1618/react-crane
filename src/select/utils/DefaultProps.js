import Arrow from '../Arrow'
import Clear from '../Clear'
import FocusPlaceholder from '../FocusPlaceholder'
import Input from '../Input'
import Menu from '../Menu'
import Option from '../Option'
import OptionGroup from '../OptionGroup'
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
  disabled: false,
  focusPlaceholderComponent: FocusPlaceholder,
  groupByKey: null,
  groups: [],
  groupTitleKey: null,
  groupValueKey: null,
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
  optionGroupComponent: OptionGroup,
  optionRenderer: null,
  optionGroupRenderer: null,
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
  valueLabelLimit: 3,
  sort: true,
  allowSelectAll: false,
  allOption: {
    value: 'Select All',
    id: '*'
  },
  allOptionText: 'All Selected'
}

export const filterSelectDefaults = {
  ...simpleSelectDefaults,
  ignoreCase: true,
  filterOptions
}

