import React from 'react'

export type Option<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  options?: T
}

export type Group<G extends Record<string, unknown> = Record<string, unknown>> = G & {
  options?: Option[]
}

export type A11yContext = {
  isMulti?: boolean
  isSearchable?: boolean
  focusedOption?: Option | null
  label?: string
  labelKey?: string
  options?: Option[] | null
  value?: string | number
}

export interface GetOptionLabelParameters {
  option: Option
  labelKey: string
  selected?: boolean
  optionDisabledKey?: string
}

export interface FilterOptionsParameters {
  allOption?: Option
  allowSelectAll?: boolean
  getOptionLabel: (opts: GetOptionLabelParameters) => string
  ignoreCase?: boolean
  labelKey: string
  valueKey: string
}

export interface GetSelectValueParameters {
  options?: Option[] | null
  value?: Option | Option[] | string | number
  valueKey: string
}

export interface ArrowRendererProps {
  isOpen?: boolean
}

export interface ArrowProps {
  arrowRenderer?: ((opts: ArrowRendererProps) => React.ReactNode) | null
  isOpen?: boolean
  onArrowClick: (event: React.MouseEvent) => void
  onArrowTouchEnd: (event: React.TouchEvent) => void
}

export interface ClearRendererProps {
  disabled?: boolean
}

export interface ClearProps {
  clearRenderer?: ((opts: ClearRendererProps) => React.ReactNode) | null | undefined
  disabled?: boolean
  onClearClick: (event: React.MouseEvent) => void
  onClearTouchEnd: (event: React.TouchEvent) => void
}

export interface FocusPlaceholderProps {
  'aria-activedescendant'?: string
  'aria-controls'?: string
  getRef: (el: HTMLElement | null) => void
  id: string
  onBlur: (event: React.FocusEvent) => void
  onFocus: (event: React.FocusEvent) => void
}

export interface InputProps {
  'aria-activedescendant'?: string
  'aria-controls'?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  disabled?: boolean
  getRef: (el: HTMLInputElement | null) => void
  id?: string
  inputValue?: string
  onBlur: (event: React.FocusEvent) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (event: React.FocusEvent) => void
}

export interface LoadingRendererProps {
  isLoading?: boolean
}

export interface LoadingProps {
  isLoading?: boolean
  loadingRenderer?: ((opts: LoadingRendererProps) => React.ReactNode) | null
}

export interface MenuProps {
  allOption?: Option
  allowSelectAll?: boolean
  focusedOption?: Option
  getOptionLabel: (opts: GetOptionLabelParameters) => string
  groupTitleKey?: string
  groupValueKey?: string
  hideCheckboxes?: boolean
  labelKey?: string
  menuRef: (el: HTMLElement | null) => void
  onOptionClick: (event: React.MouseEvent, option: Option) => void
  onOptionFocus: (event: React.MouseEvent | React.FocusEvent, option: Option) => void
  optionComponent: React.FC<OptionProps> | React.ComponentClass<OptionProps>
  optionDisabledKey?: string
  optionGroupComponent: React.FC<OptionGroupProps> | React.ComponentClass<OptionGroupProps>
  optionGroupRenderer?: ((opts: OptionGroupRendererProps) => React.ReactNode) | null
  optionRef: (el: HTMLElement | null) => void
  optionRenderer?: ((opts: OptionRendererProps) => React.ReactNode) | null
  options?: Option[]
  staticOption?: Option | Option[]
  value?: Option | Option[] | number | string
  valueKey?: string
}

export interface OptionRendererProps {
  allOption?: Option
  allowSelectAll?: boolean
  getOptionLabel: (opts: GetOptionLabelParameters) => string
  hideCheckboxes?: boolean
  isFocused?: boolean
  labelKey?: string
  option: Option
  optionDisabledKey?: string
  selected?: boolean
  valueKey?: string
}

export interface OptionProps {
  allOption?: Option
  allowSelectAll?: boolean
  getOptionLabel: (opts: GetOptionLabelParameters) => string
  hideCheckboxes?: boolean
  isFocused?: boolean
  labelKey?: string
  onOptionClick: (event: React.MouseEvent, option: Option) => void
  onOptionFocus: (event: React.MouseEvent | React.FocusEvent, option: Option) => void
  option: Option
  optionDisabledKey?: string
  optionRef: (el: HTMLElement | null, value: string) => void
  optionRenderer?: ((opts: OptionRendererProps) => React.ReactNode) | null
  selected?: boolean
  valueKey?: string
}

export interface OptionGroupRendererProps {
  groupTitleKey: string
  groupValueKey: string
  option: Option
  optionDisabledKey: string
  value: string | number | Option | Option[] | undefined
  valueKey: string
}

export interface OptionGroupProps {
  children: React.ReactNode
  groupTitleKey?: string
  groupValueKey?: string
  isFocused?: boolean
  onOptionClick: (event: React.MouseEvent, newValue: string | number | Option | undefined) => void
  onOptionFocus: (event: React.MouseEvent, option: Option) => void
  option: Option
  optionDisabledKey?: string
  optionGroupRenderer?: ((opts: OptionGroupRendererProps) => React.ReactNode) | null
  optionRef: (el: HTMLElement | null, value: string) => void
  value?: Option | Option[] | number | string
  valueKey?: string
}

export interface ValueRendererProps {
  labelKey: string
  option: Option
}

export interface ValueProps {
  getLabel: (option: Option, labelKey: string) => string
  labelKey: string
  option: Option
  valueRenderer: (opts: ValueRendererProps) => React.ReactNode
}

export interface ValueGroupRendererProps {
  clearInputOnSelect?: boolean
  getLabel: (option: Option, labelKey: string) => string
  inputValue?: string
  isFocused: boolean
  labelKey?: string
  options: Option[]
  showInput?: boolean
  showValuesWhileFocused?: boolean
  value: Option | Option[] | number | string
  valueComponent: React.ElementType
  valueKey: string
  valueRenderer?: (opts: ValueRendererProps) => React.ReactNode
}

export interface ValueGroupProps {
  clearInputOnSelect?: boolean
  getLabel: (option: Option, labelKey: string) => string
  inputValue?: string
  isFocused: boolean
  labelKey?: string
  options: Option[]
  placeholder: React.ReactNode
  showInput?: boolean
  showValuesWhileFocused?: boolean
  value: Option | Option[] | number | string
  valueComponent: React.ElementType
  valueKey: string
  valueGroupRenderer?: (opts: ValueGroupRendererProps) => React.ReactNode
  valueRenderer?: (opts: ValueRendererProps) => React.ReactNode
}

export interface InputChangeEventContext {
  name?: string
  value: string | null
}

export interface SimpleSelectProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  allOption?: Option | null
  allowSelectAll?: boolean
  arrowComponent?: React.FC<ArrowProps> | React.ComponentClass<ArrowProps>
  arrowRenderer?: ((opts: ArrowRendererProps) => React.ReactNode) | null
  autoCloseMenu?: boolean
  /** Optionally rendered before the value/input */
  beforeInput?: React.ReactNode
  className?: string
  clearable?: boolean
  clearComponent?: React.FC<ClearProps> | React.ComponentClass<ClearProps>
  clearInputOnBlur?: boolean
  clearInputOnSelect?: boolean
  clearRenderer?: ((opts: ClearRendererProps) => React.ReactNode) | null
  disabled?: boolean
  focusPlaceholderComponent?: React.FC | React.ComponentClass
  getLabel?: (option: Option, labelKey: string, selected?: boolean) => string | null
  getOptionLabel?: (opts: GetOptionLabelParameters) => string | null
  getSelectValue?: (opts: GetSelectValueParameters) => Option | null | undefined
  groupByKey?: string
  groups?: Group[]
  groupTitleKey?: string
  groupValueKey?: string
  id: string
  inputComponent?: React.FC<InputProps> | React.ComponentClass<InputProps>
  inputId?: string
  inputValue?: string
  isLoading?: boolean
  isMulti?: boolean
  isOpen?: boolean
  isSearchable?: boolean
  labelKey?: string
  loadingComponent?: React.FC<LoadingProps> | React.ComponentClass<LoadingProps>
  loadingRenderer?: ((opts: LoadingRendererProps) => React.ReactNode) | null
  loadingText?: string
  menuComponent?: React.FC<MenuProps> | React.ComponentClass<MenuProps>
  name?: string
  noResultsText?: string
  onBlur?: PropTypes.func
  onChange?: PropTypes.func
  onClose?: PropTypes.func // event emitted when Select is closed
  onFocus?: PropTypes.func
  onInputChange?: (eventContext: InputChangeEventContext, event: React.SyntheticEvent) => void
  onKeyDown?: PropTypes.func
  onOpen?: PropTypes.func // event emitted when Select is opened
  onSelect?: PropTypes.func
  onStaticOptionClick?: PropTypes.func
  openOnClick?: boolean
  openOnEmptyInput?: boolean
  optionComponent?: React.FC<OptionProps> | React.ComponentClass<OptionProps>
  optionDisabledKey?: string
  optionGroupComponent?: React.FC<OptionGroupProps> | React.ComponentClass<OptionGroupProps>
  optionGroupRenderer?: ((opts: OptionGroupRendererProps) => React.ReactNode) | null
  optionRenderer?: ((opts: OptionRendererProps) => React.ReactNode) | null
  options?: Option[] | null
  placeholder?: React.ReactNode
  showInput?: boolean
  showValuesWhileFocused?: boolean
  staticOption?: Option | Option[]
  value?: Option | Option[] | number | string
  valueComponent?: React.FC<ValueProps> | React.ComponentClass<ValueProps>
  valueGroupComponent?: React.FC<ValueGroupProps> | React.ComponentClass<ValueGroupProps>
  valueGroupRenderer?: ((opts: ValueGroupRendererProps) => React.ReactNode) | null
  valueKey?: string
  valueRenderer?: ((opts: ValueRendererProps) => React.ReactNode) | null
}

export interface MultiSelectProp extends SimpleSelectProps {
  allOption: Option
  allowSelectAll: boolean
  allSelectedText: string
  sort: boolean
  value: Option[]
  valueLabelLimit: number
}

export interface FilterSelectProps extends SimpleSelectProps {
  value: Option | Option[] | number | string
  onInputChange: PropTypes.func
  filterOptions: (options: Option[], inputValue: string, props: FilterOptionsParameters) => Option[]
  ignoreCase: boolean
  isAllSelected: PropTypes.func
}
