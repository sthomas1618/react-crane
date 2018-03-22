import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

const OptionGroupRenderer = (props) => {
  const { groupTitle, groupValueKey, option, options, value } = props
  const checked = _.some(value, (val) => {
    const valueObj = props.getSelectValue({ options, groupValueKey, value: val })
    return valueObj[groupValueKey] === option[groupValueKey]
  })
  const onChange = (e) => {
    e.preventDefault()
  }

  return (
    <span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {option[groupTitle]}
    </span>
  )
}

OptionGroupRenderer.propTypes = {
  getSelectValue: PropTypes.func.isRequired,
  groupTitle: PropTypes.string.isRequired,
  groupValueKey: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired
}

export default OptionGroupRenderer
