import _ from 'lodash'

const getSelectValue = (props) => {
  const { value, valueKey, options } = props

  if (!value) {
    return null
  }

  const getValue = (valueObj) => {
    if (_.isString(valueObj)) {
      return _.find(options, { [valueKey]: valueObj })
    }

    return valueObj
  }

  if (_.isArray(value)) {
    return getValue(value[0])
  }

  return getValue(value)
}

export default getSelectValue
