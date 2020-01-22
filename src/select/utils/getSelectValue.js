import _ from 'lodash'

const getSelectValue = (props) => {
  const { value, valueKey, options } = props

  if (!value) {
    return null
  }

  const getValue = (valueObj) => {
    if (_.isString(valueObj) || _.isNumber(valueObj)) {
      return _.find(options, { [valueKey]: valueObj })
    }

    return valueObj
  }

  if (Array.isArray(value)) {
    return getValue(value[0])
  }

  return getValue(value)
}

export default getSelectValue
