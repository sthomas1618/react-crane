import React from 'react'
import PropType from 'prop-types'

const ValueGroupRenderer = (props) => {
  const ValueComponent = props.valueComponent
  const { value, labelKey, valueLabelLimit } = props

  if (valueLabelLimit > 0 && value.length > valueLabelLimit) {
    return <span>{`${value.length} selected`}</span>
  }

  const values = value.map((val, i) => {
    const label = val[labelKey]
    const delimiter = (i + 1) === value.length ? '' : ', '
    return (
      <span key={label}>
        <ValueComponent
          {...props}
          valueClassName="crane-multi-select-value"
          value={val}
        />
        {delimiter}
      </span>
    )
  })
  return <span>{values}</span>
}

ValueGroupRenderer.propTypes = {
  valueComponent: PropType.func.isRequired,
  value: PropType.array.isRequired,
  labelKey: PropType.string.isRequired,
  valueLabelLimit: PropType.number
}

ValueGroupRenderer.defaultProps = {
  valueLabelLimit: 0
}

export default ValueGroupRenderer
