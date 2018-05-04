import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../utils'

const ValueGroupRenderer = (props) => {
  const ValueComponent = props.valueComponent
  const {
    allOption,
    allSelectedText,
    allowSelectAll,
    getLabel,
    labelKey,
    options,
    value,
    valueKey,
    valueLabelLimit,
    valueRenderer
  } = props

  if (valueLabelLimit > 0 && value.length > valueLabelLimit) {
    const count = value.length === flattenOptions(options, allowSelectAll, allOption).length
      ? allSelectedText : `${value.length} Selected`
    return <span>{count}</span>
  }

  const values = value.map((val, i) => {
    const option = props.getSelectValue({ options, valueKey, value: val })

    if (option) {
      const label = getLabel({ ...props, option })
      const delimiter = (i + 1) === value.length ? '' : ', '
      return (
        <span key={label}>
          <ValueComponent
            getLabel={getLabel}
            labelKey={labelKey}
            option={option}
            value={value}
            valueClassName="crane-multi-select-value"
            valueKey={valueKey}
            valueRenderer={valueRenderer}
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
  labelKey: PropTypes.string,
  options: PropTypes.array.isRequired,
  valueComponent: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  valueLabelLimit: PropTypes.number,
  valueRenderer: PropTypes.func
}

ValueGroupRenderer.defaultProps = {
  allowSelectAll: false,
  allOption: null,
  allSelectedText: 'All Selected',
  labelKey: '',
  valueLabelLimit: 0,
  valueRenderer: null
}

export default ValueGroupRenderer
