import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../utils'

function ValueGroupRenderer({
  allOption,
  allowSelectAll,
  allSelectedText,
  delimiter,
  getLabel,
  getSelectValue,
  labelKey,
  options,
  value,
  valueComponent,
  valueKey,
  valueLabelLimit,
  valueRenderer
}) {
  const ValueComponent = valueComponent

  if (valueLabelLimit > 0 && value.length > valueLabelLimit) {
    const count =
      value.length === flattenOptions(options, allowSelectAll, allOption).length
        ? allSelectedText
        : `${value.length} Selected`
    return <span>{count}</span>
  }
  const CustomDelimiter = typeof delimiter === 'function' ? delimiter() : delimiter

  const values = value.map((val, i) => {
    const option = getSelectValue({ options, valueKey, value: val })

    if (option) {
      const label = getLabel(option, labelKey)
      const Delimiter = i + 1 === value.length ? '' : CustomDelimiter || ', '
      return (
        <span key={label}>
          <ValueComponent
            getLabel={getLabel}
            labelKey={labelKey}
            option={option}
            valueRenderer={valueRenderer}
          />
          {Delimiter}
        </span>
      )
    }
    return null
  })

  // tests fail without react.fragment
  // eslint-disable-next-line react/jsx-no-useless-fragment, react/jsx-fragments
  return <React.Fragment>{values}</React.Fragment>
}

ValueGroupRenderer.propTypes = {
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.object,
  allSelectedText: PropTypes.string,
  delimiter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  delimiter: null,
  labelKey: '',
  valueLabelLimit: 0,
  valueRenderer: null
}

export default ValueGroupRenderer
