import { isValueEqual } from '.'

const isSelected = (option, value, valueKey) => {
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
