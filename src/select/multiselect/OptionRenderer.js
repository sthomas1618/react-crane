import _ from 'lodash'
import React from 'react'
import PropType from 'prop-types'

import { getSelectValue } from '../utils'

const OptionRenderer = (props) => {
  const { option, options, labelKey, value, valueKey } = props
  const checked = _.some(value, (val) => {
    const valueObj = getSelectValue({ options, valueKey, value: val })
    return valueObj[valueKey] === option[valueKey]
  })
  const onChange = (e) => { e.preventDefault() }

  return (
    <span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {option[labelKey]}
    </span>
  )
}

OptionRenderer.propTypes = {
  option: PropType.object.isRequired,
  options: PropType.array.isRequired,
  valueKey: PropType.string.isRequired,
  value: PropType.oneOfType([PropType.array, PropType.object, PropType.string]).isRequired,
  labelKey: PropType.string.isRequired
}

export default OptionRenderer
