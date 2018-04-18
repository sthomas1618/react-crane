import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../../src/select/utils'

const UserNameValueRenderer = (props) => {
  const { allowSelectAll,
    allOption,
    allSelectedText,
    value,
    valueKey,
    valueLabelLimit,
    options } = props

  if (valueLabelLimit > 0 && value.length > valueLabelLimit) {
    const count = value.length === flattenOptions(options, allowSelectAll, allOption).length
      ? allSelectedText : `${value.length} Selected`
    return <span>{count}</span>
  }

  const values = value.map((val, i) => {
    const valueObj = props.getSelectValue({ options, valueKey, value: val })

    if (valueObj) {
      const label = `${valueObj.lastName}, ${valueObj.firstName}`
      const delimiter = (i + 1) === value.length ? '' : ', '
      return (
        label + delimiter
      )
    }
    return null
  })
  return <span>{values}</span>
}

UserNameValueRenderer.propTypes = {
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.object,
  allSelectedText: PropTypes.string,
  getSelectValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  valueLabelLimit: PropTypes.number
}

UserNameValueRenderer.defaultProps = {
  allowSelectAll: false,
  allOption: null,
  allSelectedText: 'All Selected',
  valueLabelLimit: 0
}

export default UserNameValueRenderer
