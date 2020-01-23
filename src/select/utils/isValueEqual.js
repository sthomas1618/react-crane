const isValueEqual = (option, value, valueKey) => {
  if (value === undefined || !option) {
    return false
  }

  const getVal = val => (
    typeof val === 'string'
      || val instanceof String
      || typeof val === 'number'
      || val instanceof Number
      ? val
      : val[valueKey]
  )

  const optValue = option[valueKey]
  const testVal = Array.isArray(value) ? getVal(value[0]) : getVal(value)

  return optValue === testVal
}

export default isValueEqual
