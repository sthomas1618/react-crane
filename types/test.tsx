import * as React from 'react'

import {
  filterOptions,
  flattenOptions,
  getLabel,
  getOptionLabel,
  getSelectValue,
  isValueEqual,
  sortBy,
  Arrow,
  Clear,
  FilterSelect,
  FocusPlaceholder,
  Input,
  Loading,
  Menu,
  Option,
  OptionGroup,
  SearchSelect,
  SimpleSelect,
  Value,
  ValueGroup,
  FilterOptionsParameters,
  MultiSelect
} from 'react-crane'

const filterOptionParameters = {
  allOption: { value: 'ALL', id: 'ALL' },
  allowSelectAll: true,
  getOptionLabel: () => (''),
  ignoreCase: true,
  labelKey: '',
  valueKey: 'id'
}
filterOptions([{ id: 'foo', value: 'bar' }], 'foo', filterOptionParameters)

flattenOptions([{ id: 'foo', value: 'bar' }], true, { value: 'ALL', id: 'ALL' })

getLabel({ id: 'foo', value: 'bar' }, 'value')

const getOptionLabelParamaters = {
  option: { id: 'foo', value: 'bar' },
  labelKey: 'value',
  selected: true
}
getOptionLabel(getOptionLabelParamaters)

const getSelectValueParamaters = {
  option: { id: 'foo', value: 'bar' },
  value: 'bar',
  valueKey: 'value'
}
getSelectValue(getSelectValueParamaters)

isValueEqual({ id: 'foo', value: 'bar' }, 'bar', 'value')

sortBy('foo')

; <Arrow
  isOpen
  onArrowClick={() => { }}
  onArrowTouchEnd={() => { }}
/>
; <Arrow
  arrowRenderer={() => (null)}
  onArrowClick={() => { }}
  onArrowTouchEnd={() => { }}
/>

; <Clear
  disabled
  onClearClick={() => { }}
  onClearTouchEnd={() => { }}
/>
; <Clear
  clearRenderer={() => (null)}
  onClearClick={() => { }}
  onClearTouchEnd={() => { }}
/>

; <FocusPlaceholder
  getRef={() => (null)}
  onBlur={() => { }}
  onFocus={() => { }}
/>

; <Input
  arial-label="foo"
  aria-labelledby="bar"
  getRef={() => { }}
  id="foobar"
  inputValue="search_text"
  onBlur={() => { }}
  onChange={() => { }}
  onFocus={() => { }}
/>

; <Loading
  isLoading
  loadingRenderer={() => { }}
/>

; const options = [{ value: 'test' }]

; <Menu
  allOption={{ id: 'foo', value: 'bar' }}
  allowSelectAll
  focusedOption={{ value: 'foobar' }}
  getOptionLabel={() => 'string'}
  groupTitleKey="group_title"
  groupValueKey="group_value"
  labelKey="label"
  menuRef={() => { }}
  onOptionClick={() => { }}
  onOptionFocus={() => { }}
  optionComponent={(<div />)}
  optionGroupComponent={<span />}
  optionGroupRenderer={() => { }}
  optionRef={() => { }}
  optionRenderer={() => { }}
  options={options}
  value="test"
  valueKey="value"
/>

; <Option
  allOption={{ id: 'foo', value: 'bar' }}
  allowSelectAll
  getOptionLabel={() => 'string'}
  isFocused
  labelKey="label"
  onOptionClick={() => { }}
  onOptionFocus={() => { }}
  option={{ value: 'test' }}
  optionRef={() => { }}
  optionRenderer={() => { }}
  selected
  valueKey="value"
/>

; <OptionGroup
  groupTitleKey="group_title"
  groupValueKey="group_value"
  isFocused
  onOptionClick={() => { }}
  onOptionFocus={() => { }}
  option={{ value: 'test' }}
  optionGroupRenderer={() => { }}
  optionRef={() => { }}
  value="foo"
  valueKey="value"
>
  foo
</OptionGroup>

; <Value
  getLabel={() => 'foo'}
  labelKey="label"
  option={{ value: 'test' }}
  valueRenderer={() => {}}
/>

; <ValueGroup
  clearInputOnSelect
  getLabel={() => 'foo'}
  inputValue="input_value"
  labelKey="label"
  options={options}
  onMouseDown={() => { }}
  placeholder={<span />}
  showInput
  value={{ value: 'test' }}
  valueComponent={<span />}
  valueKey="value"
  valueGroupRenderer={() => { }}
  valueRenderer={() => { }}
/>

const groups = [{ id: 'test' }]

; <SimpleSelect
  aria-label="foo_label"
  aria-labelledby="foo_labelledby"
  arrowComponent={() => { }}
  arrowRenderer={() => { }}
  autoCloseMenu
  className="class-name"
  clearable
  clearComponent={() => { }}
  clearInputOnBlur
  clearInputOnSelect
  clearRenderer={() => { }}
  disabled
  focusPlaceholderComponent={() => { }}
  getLabel={() => 'label'}
  getOptionLabel={() => 'option_label'}
  getSelectValue={() => ({})}
  groupByKey="group_by_key"
  groups={groups}
  groupTitleKey="group_title_key"
  groupValueKey="group_value_key"
  id="my_id"
  inputComponent={() => { }}
  inputId="input_id"
  inputValue="input_vale"
  isLoading
  isOpen
  labelKey="label"
  loadingComponent={() => { }}
  loadingRenderer={() => { }}
  loadingText="Loading!"
  menuComponent={() => { }}
  name="field_name"
  noResultsText="No Results!"
  onBlur={() => { }}
  onChange={() => { }}
  onClose={() => { }}
  onFocus={() => { }}
  onInputChange={() => { }}
  onKeyDown={() => { }}
  onOpen={() => { }}
  onSelect={() => { }}
  openOnClick
  openOnEmptyInput
  optionComponent={() => { }}
  optionGroupComponent={() => { }}
  optionGroupRenderer={() => { }}
  optionRenderer={() => { }}
  options={options}
  placeholder="placeholder"
  showInput
  value={1}
  valueComponent={() => { }}
  valueGroupComponent={() => { }}
  valueGroupRenderer={() => { }}
  valueKey="value"
  valueRenderer={() => { }}
/>

; <SearchSelect
  aria-label="foo_label"
  aria-labelledby="foo_labelledby"
  arrowComponent={() => { }}
  arrowRenderer={() => { }}
  autoCloseMenu
  className="class-name"
  clearable
  clearComponent={() => { }}
  clearInputOnBlur
  clearInputOnSelect
  clearRenderer={() => { }}
  disabled
  focusPlaceholderComponent={() => { }}
  getLabel={() => 'label'}
  getOptionLabel={() => 'option_label'}
  getSelectValue={() => ({})}
  groupByKey="group_by_key"
  groups={groups}
  groupTitleKey="group_title_key"
  groupValueKey="group_value_key"
  id="my_id"
  inputComponent={() => { }}
  inputId="input_id"
  inputValue="input_vale"
  isLoading
  isOpen
  labelKey="label"
  loadingComponent={() => { }}
  loadingRenderer={() => { }}
  loadingText="Loading!"
  menuComponent={() => { }}
  name="field_name"
  noResultsText="No Results!"
  onBlur={() => { }}
  onChange={() => { }}
  onClose={() => { }}
  onFocus={() => { }}
  onInputChange={() => { }}
  onKeyDown={() => { }}
  onOpen={() => { }}
  onSelect={() => { }}
  openOnClick
  openOnEmptyInput
  optionComponent={() => { }}
  optionGroupComponent={() => { }}
  optionGroupRenderer={() => { }}
  optionRenderer={() => { }}
  options={options}
  placeholder="placeholder"
  showInput
  value={1}
  valueComponent={() => { }}
  valueGroupComponent={() => { }}
  valueGroupRenderer={() => { }}
  valueKey="value"
  valueRenderer={() => { }}
/>

const multiSelectValues = [{ id: '1' }]
; <MultiSelect
  allOption={{ id: 'foo', value: 'bar' }}
  allowSelectAll
  allSelectedText="ALL"
  sort
  value={multiSelectValues}
  valueLabelLimit={10}
/>

; const customFilterOptions = () => ([{ id: '1' }])
; <FilterSelect
  filterOptions={customFilterOptions}
  ignoreCase
  isAllSelected
  value="value"
/>
