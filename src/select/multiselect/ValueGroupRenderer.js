import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../utils'

const ValueGroupRenderer = (props) => {
  const ValueComponent = props.valueComponent
  const { allowSelectAll,
    allOption,
    allSelectedText,
    getLabel,
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
      const label = getLabel({ props, option: valueObj })
      const delimiter = (i + 1) === value.length ? '' : ', '
      return (
        <span key={label}>
          <ValueComponent
            {...props}
            valueClassName="crane-multi-select-value"
            value={valueObj}
          />
          {delimiter}
        </span>
      )
    }
    return null
  })
  return <span>{values}</span>
}

ValueGroupRenderer.propTypes = {
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.object,
  allSelectedText: PropTypes.string,
  getLabel: PropTypes.func.isRequired,
  getSelectValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  valueComponent: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  valueLabelLimit: PropTypes.number
}

ValueGroupRenderer.defaultProps = {
  allowSelectAll: false,
  allOption: null,
  allSelectedText: 'All Selected',
  valueLabelLimit: 0
}

export default ValueGroupRenderer
