const filterOptions = (options, inputValue, props) => {
  const { allOption, allowSelectAll, labelKey, ignoreCase, valueKey } = props

  let searchText = inputValue || ''

  if (searchText === '') {
    return options
  }

  if (ignoreCase) {
    searchText = searchText.toLowerCase()
  }

  // TODO strip diatrics, other options
  return options.filter((option) => {
    // Don't include the select all option in filtered results
    if (allowSelectAll && allOption[valueKey] === option[valueKey]) {
      return false
    }

    let label = String(option[labelKey]) || ''

    if (ignoreCase) {
      label = label.toLowerCase()
    }

    return label.indexOf(searchText) > -1
  })
}

export default filterOptions
