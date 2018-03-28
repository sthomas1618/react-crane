import PropTypes from 'prop-types'

export const simpleSelectPropTypes = {
  autoCloseMenu: PropTypes.bool,
  arrowComponent: PropTypes.func,
  arrowRenderer: PropTypes.func,
  className: PropTypes.string,
  clearable: PropTypes.bool,
  clearComponent: PropTypes.func,
  clearInputOnBlur: PropTypes.bool,
  clearInputOnSelect: PropTypes.bool,
  clearRenderer: PropTypes.func,
  focusPlaceholderComponent: PropTypes.func,
  getSelectValue: PropTypes.func,
  groupByKey: PropTypes.string,
  groups: PropTypes.array,
  groupTitleKey: PropTypes.string,
  groupValueKey: PropTypes.string,
  inputComponent: PropTypes.func,
  inputValue: PropTypes.string,
  isOpen: PropTypes.bool,
  labelKey: PropTypes.string,
  name: PropTypes.string,
  noResultsText: PropTypes.string,
  menuComponent: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onInputChange: PropTypes.func,
  openOnClick: PropTypes.bool,
  openOnEmptyInput: PropTypes.bool,
  optionComponent: PropTypes.func,
  optionGroupComponent: PropTypes.func,
  optionRenderer: PropTypes.func,
  optionGroupRenderer: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  showInput: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  valueComponent: PropTypes.func,
  valueRenderer: PropTypes.func,
  valueGroupComponent: PropTypes.func,
  valueGroupRenderer: PropTypes.func,
  valueKey: PropTypes.string
}

export const multiSelectPropTypes = {
  ...simpleSelectPropTypes,
  value: PropTypes.array,
  valueLabelLimit: PropTypes.number,
  sort: PropTypes.bool,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string
  }),
  allSelectedText: PropTypes.string
}

export const filterSelectPropTypes = {
  ...simpleSelectPropTypes,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onInputChange: PropTypes.func,
  filterOptions: PropTypes.func,
  ignoreCase: PropTypes.bool
}
