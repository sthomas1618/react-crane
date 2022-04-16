import { Option } from '../typeDefs'

function isValueEqual(
  option: Option,
  value: string | number | Option | Option[],
  valueKey: string
) {
  if (value === undefined || !option) {
    return false
  }

  const getVal = (val: string | number | Option) =>
    typeof val === 'string' || typeof val === 'number' ? val : val[valueKey]

  const optValue = option[valueKey]
  const testVal = Array.isArray(value) ? getVal(value[0]) : getVal(value)

  return optValue === testVal
}

export default isValueEqual
