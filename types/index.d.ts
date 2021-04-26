import * as React from 'react'

export type ValueLike = object[] | number | object | string | null

export interface AllOption {
  value: string,
  id: string
}

export interface GetOptionLabelParameters {
  option?: object,
  labelKey?: string,
  selected?: boolean
}

export interface GetSelectValueParameters {
  option?: object,
  value?: ValueLike,
  valueKey?: string
}

export interface FilterOptionsParameters {
  allOption?: AllOption,
  allowSelectAll?: boolean,
  getOptionLabel?: (parameters: GetOptionLabelParameters) => string,
  ignoreCase?: boolean,
  labelKey?: string,
  valueKey?: string
}

export function filterOptions(options: object[], inputValue: string, parameters: FilterOptionsParameters): object[];
export function flattenOptions(options: object[], allowSelectAll: boolean, allOption: AllOption): object[];
export function getLabel(option: object, labelKey: string): string;
export function getOptionLabel(parameters: GetOptionLabelParameters): string;
export function getSelectValue(parameters: GetSelectValueParameters): object;
export function isValueEqual(option: object, value: ValueLike, valueKey: string): boolean;
export function sortBy(key: string): () => number;

export interface OnBlurEventContext {
  name: string
}
export interface OnFocusEventContext {
  name: string
}
export interface OnChangeEventContext {
  name: string,
  value: object
}
export interface OnInputChangeEventContext {
  name: string,
  value: string
}

export interface ArrowProps {
  arrowRenderer?: React.ReactNode,
  isOpen?: boolean,
  onArrowClick: (event: React.MouseEvent<Arrow>) => void,
  onArrowTouchEnd: (event: React.MouseEvent<Arrow>) => void
}

export class Arrow<
  As extends React.ElementType = 'div'
> extends React.Component<ArrowProps, any> {}

export interface ClearProps {
  clearRenderer?: React.ReactNode,
  disabled?: boolean,
  onClearClick: (event: React.MouseEvent<Clear>) => void,
  onClearTouchEnd: (event: React.MouseEvent<Clear>) => void
}

export class Clear<
  As extends React.ElementType = 'div'
> extends React.Component<ClearProps, any> {}

export interface FocusPlaceholderProps {
  getRef: (element: HTMLInputElement) => void,
  onBlur: (event: React.SyntheticEvent<FocusPlaceholder>) => void,
  onFocus: (event: React.SyntheticEvent<FocusPlaceholder>) => void
}

export class FocusPlaceholder<
  As extends React.ElementType = 'input'
> extends React.Component<FocusPlaceholderProps, any> {}

export interface InputProps {
  'aria-label'?: string,
  'aria-labelledby'?: string,
  getRef: (element: HTMLInputElement) => void,
  id?: string,
  inputValue?: string,
  onBlur: (event: React.SyntheticEvent<Input>) => void,
  onChange: (event: React.SyntheticEvent<Input>) => void,
  onFocus: (event: React.SyntheticEvent<Input>) => void,
}

export class Input<
  As extends React.ElementType = 'div'
> extends React.Component<InputProps, any> {}

export interface LoadingProps {
  isLoading?: boolean,
  loadingRenderer: React.ReactNode
}

export class Loading<
  As extends React.ElementType = 'div'
> extends React.Component<LoadingProps, any> {}

export interface MenuProps {
  allOption?: AllOption,
  allowSelectAll?: boolean,
  focusedOption?: object,
  getOptionLabel: (parameters: GetOptionLabelParameters) => string,
  groupTitleKey?: string,
  groupValueKey?: string,
  labelKey?: string,
  menuRef: (element: HTMLElement) => void,
  onOptionClick: (event: React.SyntheticEvent<Menu>) => void,
  onOptionFocus: (event: React.SyntheticEvent<Menu>) => void,
  optionComponent?: React.ReactNode,
  optionGroupComponent?: React.ReactNode,
  optionGroupRenderer?: React.ReactNode,
  optionRef: (element: HTMLElement) => void,
  optionRenderer?: React.ReactNode,
  options?: object[],
  value?: ValueLike,
  valueKey?: string
}

export class Menu<
  As extends React.ElementType = 'div'
> extends React.Component<MenuProps, any> {}

export interface OptionProps {
  allOption?: AllOption,
  allowSelectAll?: boolean,
  getOptionLabel: (parameters: GetOptionLabelParameters) => string,
  isFocused?: boolean,
  labelKey?: string,
  onOptionClick: (event: React.SyntheticEvent<Option>) => void,
  onOptionFocus: (event: React.SyntheticEvent<Option>) => void,
  option: object,
  optionRef: (element: HTMLElement) => void,
  optionRenderer?: React.ReactNode,
  staticOptions?: object | object[],
  selected?: boolean,
  valueKey?: string
}

export class Option<
  As extends React.ElementType = 'div'
> extends React.Component<OptionProps, any> {}

export interface OptionGroupProps {
  children: React.ReactNode,
  groupTitleKey?: string,
  groupValueKey?: string,
  isFocused?: boolean,
  onOptionClick: (event: React.SyntheticEvent<Option>) => void,
  onOptionFocus: (event: React.SyntheticEvent<Option>) => void,
  option: object,
  optionGroupRenderer?: React.ReactNode,
  optionRef: (element: HTMLElement) => void,
  value?: ValueLike,
  valueKey?: string
}

export class OptionGroup<
  As extends React.ElementType = 'div'
> extends React.Component<OptionGroupProps, any> {}

export interface ValueProps {
  getLabel: (option: object, labelKey: string) => string,
  labelKey: string,
  option?: object,
  valueRenderer: React.ReactNode
}

export class Value<
  As extends React.ElementType = 'span'
> extends React.Component<ValueProps, any> {}

export interface ValueGroupProps {
  clearInputOnSelect?: boolean,
  getLabel: (option: object, labelKey: string) => string,
  inputValue?: string,
  labelKey?: string,
  options: object[],
  onMouseDown?: (event: React.MouseEvent<Arrow>) => void,
  placeholder?: React.ReactNode,
  showInput?: boolean,
  value?: ValueLike,
  valueComponent?: React.ReactNode,
  valueKey: string,
  valueGroupRenderer: React.ReactNode,
  valueRenderer: React.ReactNode
}

export class ValueGroup<
  As extends React.ElementType = 'div'
> extends React.Component<ValueGroupProps, any> {}

export interface SimpleSelectProps {
  'aria-label'?: string,
  'aria-labelledby'?: string,
  arrowComponent?: React.ReactNode,
  arrowRenderer?: React.ReactNode,
  autoCloseMenu?: boolean,
  beforeInput?: React.ReactNode,
  className?: string,
  clearable?: boolean,
  clearComponent?: React.ReactNode,
  clearInputOnBlur?: boolean,
  clearInputOnSelect?: boolean,
  clearRenderer?: React.ReactNode,
  disabled?: boolean,
  focusPlaceholderComponent?: React.ReactNode,
  getLabel?: (option: object, labelKey: string) => string,
  getOptionLabel?: (parameters: GetOptionLabelParameters) => string,
  getSelectValue?: (parameters: GetSelectValueParameters) => object,
  groupByKey?: string,
  groups?: object[],
  groupTitleKey?: string,
  groupValueKey?: string,
  id?: string,
  inputComponent?: React.ReactNode,
  inputId?: string,
  inputValue?: string,
  isLoading?: boolean,
  isMulti?: boolean,
  isOpen?: boolean,
  isSearchable?: boolean,
  labelKey?: string,
  loadingComponent?: React.ReactNode,
  loadingRenderer?: React.ReactNode,
  loadingText?: string,
  menuComponent?: React.ReactNode,
  name?: string,
  noResultsText?: string,
  onBlur?: (eventContext: OnBlurEventContext, event: React.SyntheticEvent<SimpleSelect>) => void,
  onChange?: (eventContext: OnChangeEventContext, event: React.SyntheticEvent<SimpleSelect>) => void,
  onClose?: () => void,
  onFocus?: (eventContext: OnFocusEventContext, event: React.SyntheticEvent<SimpleSelect>) => void,
  onInputChange?: (eventContext: OnInputChangeEventContext, event: React.SyntheticEvent<SimpleSelect>) => void,
  onKeyDown?: (eventContext: OnChangeEventContext, event: React.SyntheticEvent<SimpleSelect>) => void,
  onOpen?: () => void,
  onSelect?: (event: React.KeyboardEvent<SimpleSelect>) => void,
  onStaticOptionClick?: (eventContext: OnChangeEventContext, event: React.SyntheticEvent<SimpleSelect>) => void,
  openOnClick?: boolean,
  openOnEmptyInput?: boolean,
  optionComponent?: React.ReactNode,
  optionGroupComponent?: React.ReactNode,
  optionGroupRenderer?: React.ReactNode,
  optionRenderer?: React.ReactNode,
  options?: object[],
  placeholder?: React.ReactNode,
  showInput?: boolean,
  staticOptions?: object | object[],
  value?: ValueLike,
  valueComponent?: React.ReactNode,
  valueGroupComponent?: React.ReactNode,
  valueGroupRenderer?: React.ReactNode,
  valueKey?: string,
  valueRenderer?: React.ReactNode
}

export interface MultiSelectProps extends SimpleSelectProps {
  allOption?: AllOption,
  allowSelectAll?: boolean,
  allSelectedText?: string,
  sort?: boolean,
  value?: object[],
  valueLabelLimit?: number
}

export interface FilterSelectProps extends SimpleSelectProps {
  filterOptions?: (objects: object[], inputValue: string, parameters: GetOptionLabelParameters) => object[],
  ignoreCase?: boolean,
  isAllSelected?: boolean,
  value?: ValueLike,
}

export class SimpleSelect<
  As extends React.ElementType = 'div'
> extends React.Component<SimpleSelectProps, any> {}

export class SearchSelect<
  As extends React.ElementType = 'div'
> extends React.Component<SimpleSelectProps, any> {}

export class MultiSelect<
  As extends React.ElementType = 'div'
> extends React.Component<MultiSelectProps, any> {}

export class FilterSelect<
  As extends React.ElementType = 'div'
> extends React.Component<FilterSelectProps, any> {}
