import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

const UserNameOptionRenderer = (props) => {
  const { getSelectValue, option, options, value, valueKey } = props
  const checked = _.some(value, (val) => {
    const valueObj = getSelectValue({ options, valueKey, value: val })
    return valueObj[valueKey] === option[valueKey]
  })
  const onChange = (e) => { e.preventDefault() }

  return (
    <span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {`${option.lastName}, ${option.firstName}`}
    </span>
  )
}

UserNameOptionRenderer.propTypes = {
  getSelectValue: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired
}

export default UserNameOptionRenderer
