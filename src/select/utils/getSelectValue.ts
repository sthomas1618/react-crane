import { Option, GetSelectValueParameters } from '../typeDefs'

function getSelectValue({
  value,
  valueKey,
  options
}: GetSelectValueParameters): Option | null | undefined {
  if (!value || !options) {
    return null
  }

  const getValue = (valueObj: Option | string | number) => {
    if (typeof valueObj === 'string' || typeof valueObj === 'number') {
      return options.find((o) => o[valueKey] === valueObj)
    }

    return valueObj
  }

  if (Array.isArray(value)) {
    return getValue(value[0])
  }

  return getValue(value)
}

export default getSelectValue
