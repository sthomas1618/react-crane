import _ from 'lodash'
import React from 'react'
import PropType from 'prop-types'

const OptionRenderer = (props) => {
  const { option, labelKey, value, valueKey } = props
  const checked = _.some(value, val => (val[valueKey] === option[valueKey]))
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
  valueKey: PropType.string.isRequired,
  value: PropType.oneOfType([PropType.array, PropType.object]).isRequired,
  labelKey: PropType.string.isRequired
}

export default OptionRenderer
