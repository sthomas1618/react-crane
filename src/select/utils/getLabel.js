const getLabel = (props) => {
  const { labelKey, option } = props

  if (!option) {
    return null
  }

  return option[labelKey]
}

export default getLabel
