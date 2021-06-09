import Arrow from '../Arrow'
import Clear from '../Clear'
import FocusPlaceholder from '../FocusPlaceholder'
import Input from '../Input'
import Loading from '../Loading'
import Menu from '../Menu'
import Option from '../Option'
import OptionGroup from '../OptionGroup'
import Value from '../Value'
import ValueGroup from '../ValueGroup'

import filterOptions from './filterOptions'
import getLabel from './getLabel'
import getOptionLabel from './getOptionLabel'
import getSelectValue from './getSelectValue'

export const simpleSelectDefaults = {
  arrowComponent: Arrow,
  arrowRenderer: null,
  autoCloseMenu: true,
  className: null,
  clearComponent: Clear,
  clearInputOnBlur: true,
  clearInputOnSelect: true,
  clearRenderer: null,
  clearable: false,
  disabled: false,
  focusPlaceholderComponent: FocusPlaceholder,
  getLabel,
  getOptionLabel,
  getSelectValue,
  groupByKey: null,
  groupTitleKey: null,
  groupValueKey: null,
  groups: [],
  inputComponent: Input,
  inputValue: '',
  isLoading: false,
  isMulti: false,
  isOpen: false,
  isSearchable: false,
  labelKey: 'label',
  loadingComponent: Loading,
  loadingRenderer: null,
  loadingText: 'Loading...',
  menuComponent: Menu,
  name: null,
  noResultsText: 'No Results Found',
  onBlur: null,
  onChange: null,
  onClose: null,
  onFocus: null,
  onInputChange: null,
  onKeyDown: null,
  onOpen: null,
  onSelect: null,
  openOnClick: true,
  openOnEmptyInput: true,
  optionComponent: Option,
  optionGroupComponent: OptionGroup,
  optionGroupRenderer: null,
  optionRenderer: null,
  options: [],
  placeholder: 'Select value...',
  showInput: false,
  value: null,
  valueComponent: Value,
  valueGroupComponent: ValueGroup,
  valueGroupRenderer: null,
  valueKey: 'value',
  valueRenderer: null
}

export const multiSelectDefaults = {
  ...simpleSelectDefaults,
  autoCloseMenu: false,
  allOption: {
    value: 'Select All',
    id: '*'
  },
  allowSelectAll: false,
  allSelectedText: 'All Selected',
  hideCheckboxes: false,
  showValuesWhileFocused: false,
  sort: true,
  value: [],
  valueLabelLimit: 3
}

export const filterSelectDefaults = {
  ...simpleSelectDefaults,
  ignoreCase: true,
  filterOptions
}

