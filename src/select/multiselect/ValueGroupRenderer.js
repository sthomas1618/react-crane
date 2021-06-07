import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../utils'

const ValueGroupRenderer = (props) => {
  const ValueComponent = props.valueComponent
  const {
    allOption,
    allSelectedText,
    allowSelectAll,
    customDelimiter,
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
  const CustomDelimiter = typeof customDelimiter === 'function' ? customDelimiter() : customDelimiter

  const values = value.map((val, i) => {
    const option = props.getSelectValue({ options, valueKey, value: val })

    if (option) {
      const label = getLabel(option, labelKey)
      const delimiter = (i + 1) === value.length ? '' : CustomDelimiter || ', '
      return (
        <span key={label}>
          <ValueComponent
            getLabel={getLabel}
            labelKey={labelKey}
            option={option}
            valueRenderer={valueRenderer}
          />
          {delimiter}
        </span>
      )
    }
    return null
  })
  return <React.Fragment>{values}</React.Fragment>
}

ValueGroupRenderer.propTypes = {
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.object,
  allSelectedText: PropTypes.string,
  customDelimiter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  customDelimiter: null,
  labelKey: '',
  valueLabelLimit: 0,
  valueRenderer: null
}

export default ValueGroupRenderer
