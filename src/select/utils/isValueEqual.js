import _ from 'lodash'

const isValueEqual = (option, value, valueKey) => {
  if (value === undefined || !option) {
    return false
  }

  const getVal = val => (
    _.isString(val) || _.isNumber(val) ? val : val[valueKey]
  )

  const optValue = option[valueKey]
  const testVal = Array.isArray(value) ? getVal(value[0]) : getVal(value)

  return optValue === testVal
}

export default isValueEqual
