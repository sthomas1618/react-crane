import { Option, FilterOptionsParameters } from '../typeDefs'

function filterOptions(
  options: Option[],
  inputValue: string,
  props: FilterOptionsParameters
): Option[] {
  const { allOption, allowSelectAll, getOptionLabel, ignoreCase, labelKey, valueKey } = props

  let searchText = inputValue || ''

  if (searchText === '') {
    return options
  }

  if (ignoreCase) {
    searchText = searchText.toLowerCase()
  }

  const matchOption = (option: T) => {
    let label = getOptionLabel({ option, labelKey }) || ''

    if (ignoreCase) {
      label = label.toLowerCase()
    }

    return label.indexOf(searchText) > -1
  }

  let isGrouped = false

  // TODO strip diatrics, other options
  const filteredOptions = options.filter((option) => {
    // Don't include the select all option in filtered results
    if (allowSelectAll && allOption && allOption[valueKey] === option[valueKey]) {
      return false
    }

    if (Array.isArray(option.options)) {
      isGrouped = true
      return option.options.some((o) => matchOption(o))
    }

    return matchOption(option)
  })

  const displayableOptions = isGrouped
    ? filteredOptions.map((option) => {
        if (Array.isArray(option.options)) {
          isGrouped = true
          return {
            ...option,
            options: option.options.filter((o) => matchOption(o))
          }
        }

        return option
      })
    : filteredOptions

  return displayableOptions as Option[]
}

export default filterOptions
