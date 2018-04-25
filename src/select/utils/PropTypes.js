import PropTypes from 'prop-types'

export const simpleSelectPropTypes = {
  arrowComponent: PropTypes.func,
  arrowRenderer: PropTypes.func,
  autoCloseMenu: PropTypes.bool,
  className: PropTypes.string,
  clearComponent: PropTypes.func,
  clearInputOnBlur: PropTypes.bool,
  clearInputOnSelect: PropTypes.bool,
  clearRenderer: PropTypes.func,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  focusPlaceholderComponent: PropTypes.func,
  getLabel: PropTypes.func,
  getOptionLabel: PropTypes.func,
  getSelectValue: PropTypes.func,
  groupByKey: PropTypes.string,
  groupTitleKey: PropTypes.string,
  groupValueKey: PropTypes.string,
  groups: PropTypes.array,
  inputComponent: PropTypes.func,
  inputValue: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  labelKey: PropTypes.string,
  loadingComponent: PropTypes.func,
  loadingRenderer: PropTypes.func,
  menuComponent: PropTypes.func,
  name: PropTypes.string,
  noResultsText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func, // event emitted when Select is closed
  onFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onOpen: PropTypes.func, // event emitted when Select is opened
  openOnClick: PropTypes.bool,
  openOnEmptyInput: PropTypes.bool,
  optionComponent: PropTypes.func,
  optionGroupComponent: PropTypes.func,
  optionGroupRenderer: PropTypes.func,
  optionRenderer: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  showInput: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  valueComponent: PropTypes.func,
  valueGroupComponent: PropTypes.func,
  valueGroupRenderer: PropTypes.func,
  valueKey: PropTypes.string,
  valueRenderer: PropTypes.func
}

export const multiSelectPropTypes = {
  ...simpleSelectPropTypes,
  allOption: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string
  }),
  allowSelectAll: PropTypes.bool,
  allSelectedText: PropTypes.string,
  sort: PropTypes.bool,
  value: PropTypes.array,
  valueLabelLimit: PropTypes.number
}

export const filterSelectPropTypes = {
  ...simpleSelectPropTypes,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onInputChange: PropTypes.func,
  filterOptions: PropTypes.func,
  ignoreCase: PropTypes.bool,
  isAllSelected: PropTypes.func
}
