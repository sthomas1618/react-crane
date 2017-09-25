const filterOptions = (options, inputValue, props) => {
  const { labelKey } = props

  // TODO strip diatrics, other options
  return options.filter((option) => {
    const label = String(option[labelKey])

    return label.indexOf(inputValue) > -1
  })
}

export default filterOptions
