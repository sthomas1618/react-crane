import React from 'react'
import PropTypes from 'prop-types'
import { flattenOptions } from '../../src/select/utils'

function CustomValueRenderer(props) {
  const {
    allowSelectAll,
    allOption,
    getSelectValue,
    groupTitleKey,
    labelKey,
    options,
    value,
    valueKey
  } = props

  if (value.length === flattenOptions(options, allowSelectAll, allOption).length) {
    return <span>All Terms</span>
  }

  let addCount = 0
  const values = options.map((opt, pos) => {
    if (opt.options && Array.isArray(opt.options) && opt.options.length > 0) {
      const difference = [opt.options, value].reduce((a, b) => a.filter((v) => !b.includes(v)))

      // If all of the options in a group are selected, show the group title
      if (difference.length === 0) {
        const groupLabel = `${opt[groupTitleKey]} (`
        const groupOps = opt.options.map((val, i) => {
          addCount += 1
          const label = val[labelKey]
          let delimiter = ', '
          if (i + 1 === opt.options.length) {
            delimiter =
              opt.options.length !== value.length && pos + 1 !== options.length ? '), ' : ') '
          }
          return i === 0 ? groupLabel + label + delimiter : label + delimiter
        })
        return groupOps
      }
      // Otherwise show the individual selections
      const selections = opt.options.map((val) => {
        const valueObj = getSelectValue({ options: value, valueKey, value: val[valueKey] })

        if (valueObj) {
          addCount += 1
          const label = valueObj[labelKey]
          const delimiter = addCount === value.length ? '' : ', '
          return label + delimiter
        }
        return null
      })
      return selections
    }
    return null
  })
  return <span>{values}</span>
}

CustomValueRenderer.propTypes = {
  getSelectValue: PropTypes.func.isRequired,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.object,
  groupTitleKey: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired
}

CustomValueRenderer.defaultProps = {
  allowSelectAll: false,
  allOption: null
}

export default CustomValueRenderer
