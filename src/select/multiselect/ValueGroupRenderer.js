import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../utils'

const ValueGroupRenderer = (props) => {
  const ValueComponent = props.valueComponent
  const { allowSelectAll, allOption, value, valueKey, labelKey, valueLabelLimit, options } = props

  if (valueLabelLimit > 0 && value.length > valueLabelLimit) {
    const count = value.length === flattenOptions(options, allowSelectAll, allOption).length ? 'All' : value.length
    return <span>{`${count} selected`}</span>
  }

  const values = value.map((val, i) => {
    const valueObj = props.getSelectValue({ options, valueKey, value: val })

    if (valueObj) {
      const label = valueObj[labelKey]
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
  getSelectValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  valueComponent: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  valueLabelLimit: PropTypes.number
}

ValueGroupRenderer.defaultProps = {
  allowSelectAll: false,
  allOption: null,
  valueLabelLimit: 0
}

export default ValueGroupRenderer
