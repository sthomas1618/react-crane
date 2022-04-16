import isValueEqual from './isValueEqual'
import { Option } from '../typeDefs'

function isSelected(
  option: Option,
  value: string | number | Option | Option[] | null | undefined,
  valueKey: string
) {
  if (value !== null) {
    if (Array.isArray(value)) {
      if (value.length > 0 && value.some((val) => isValueEqual(option, val, valueKey))) {
        return true
      }
    } else if (typeof value === 'object' && value[valueKey] === option[valueKey]) {
      return true
    } else if (value === option[valueKey]) {
      return true
    }
  }

  return false
}

export default isSelected
