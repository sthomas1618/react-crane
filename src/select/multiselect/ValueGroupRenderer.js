import React from 'react'
import PropType from 'prop-types'

import { getSelectValue } from '../utils'

const ValueGroupRenderer = (props) => {
  const ValueComponent = props.valueComponent
  const { value, valueKey, labelKey, valueLabelLimit, options } = props

  if (valueLabelLimit > 0 && value.length > valueLabelLimit) {
    const count = value.length === options.length ? 'All' : value.length
    return <span>{`${count} selected`}</span>
  }

  const values = value.map((val, i) => {
    const valueObj = getSelectValue({ options, valueKey, value: val })
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
  })
  return <span>{values}</span>
}

ValueGroupRenderer.propTypes = {
  options: PropType.array.isRequired,
  valueComponent: PropType.func.isRequired,
  value: PropType.array.isRequired,
  valueKey: PropType.string.isRequired,
  labelKey: PropType.string.isRequired,
  valueLabelLimit: PropType.number
}

ValueGroupRenderer.defaultProps = {
  valueLabelLimit: 0
}

export default ValueGroupRenderer
