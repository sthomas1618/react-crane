import React from 'react'
import PropTypes from 'prop-types'

import { isValueEqual } from '../utils'

const OptionRenderer = (props) => {
  const {
    getOptionLabel,
    option,
    value,
    valueKey
  } = props
  const checked = value.length && value.some(val => isValueEqual(option, val, valueKey))
  const onChange = (e) => { e.preventDefault() }

  return (
    <span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {getOptionLabel(props)}
    </span>
  )
}

OptionRenderer.propTypes = {
  getOptionLabel: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}

export default OptionRenderer
