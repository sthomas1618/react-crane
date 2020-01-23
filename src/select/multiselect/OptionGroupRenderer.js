import React from 'react'
import PropTypes from 'prop-types'

import { isValueEqual } from '../utils'

const OptionGroupRenderer = (props) => {
  const {
    groupTitleKey,
    groupValueKey,
    option,
    value,
    valueKey
  } = props
  const checked = value && value.length &&
    value.some(val => (
      isValueEqual(option, val, groupValueKey) ||
      (
        option.options &&
        option.options.length &&
        option.options.some(opt => isValueEqual(opt, val, valueKey))
      )
    ))
  const onChange = (e) => {
    e.preventDefault()
  }

  return (
    <span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {option[groupTitleKey]}
    </span>
  )
}

OptionGroupRenderer.propTypes = {
  groupTitleKey: PropTypes.string.isRequired,
  groupValueKey: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  valueKey: PropTypes.string.isRequired
}

export default OptionGroupRenderer
