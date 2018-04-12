import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

const OptionRenderer = (props) => {
  const { option, options, labelKey, value, valueKey } = props
  const checked = _.some(value, (val) => {
    const valueObj = props.getSelectValue({ options, valueKey, value: val })
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
  getSelectValue: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired,
  labelKey: PropTypes.string.isRequired
}

export default OptionRenderer
