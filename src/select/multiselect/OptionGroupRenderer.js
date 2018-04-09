import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

const OptionGroupRenderer = (props) => {
  const {
    groupTitleKey,
    groupValueKey,
    option,
    options,
    unfilteredOptions,
    value,
    valueKey } = props
  const opts = unfilteredOptions.length > 0 ? unfilteredOptions : options
  const checked = _.some(value, (val) => {
    const valueObj = props.getSelectValue({ options: opts, groupValueKey, value: val, valueKey })
    return valueObj[groupValueKey] === option[groupValueKey]
  })
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
  getSelectValue: PropTypes.func.isRequired,
  groupTitleKey: PropTypes.string.isRequired,
  groupValueKey: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  unfilteredOptions: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired,
  valueKey: PropTypes.string.isRequired
}

OptionGroupRenderer.defaultProps = {
  unfilteredOptions: []
}

export default OptionGroupRenderer
