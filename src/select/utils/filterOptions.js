const filterOptions = (options, inputValue, props) => {
  const { labelKey, ignoreCase } = props

  let searchText = inputValue || ''

  if (ignoreCase) {
    searchText = searchText.toLowerCase()
  }

  // TODO strip diatrics, other options
  return options.filter((option) => {
    let label = String(option[labelKey]) || ''

    if (ignoreCase) {
      label = label.toLowerCase()
    }

    return label.indexOf(searchText) > -1
  })
}

export default filterOptions
