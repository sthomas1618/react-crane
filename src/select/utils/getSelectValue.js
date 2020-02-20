const getSelectValue = ({ value, valueKey, options }) => {
  if (!value) {
    return null
  }

  const getValue = (valueObj) => {
    if (typeof valueObj === 'string'
      || valueObj instanceof String
      || typeof valueObj === 'number'
      || valueObj instanceof Number) {
      return options.find(o => o[valueKey] === valueObj)
    }

    return valueObj
  }

  if (Array.isArray(value)) {
    return getValue(value[0])
  }

  return getValue(value)
}

export default getSelectValue
