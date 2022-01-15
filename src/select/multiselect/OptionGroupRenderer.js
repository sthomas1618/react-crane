import React from 'react'
import PropTypes from 'prop-types'

import { isValueEqual } from '../utils'

function OptionGroupRenderer(props) {
  const { groupTitleKey, groupValueKey, option, optionDisabledKey, value, valueKey } = props
  const checked =
    value &&
    value.length &&
    value.some(
      (val) =>
        isValueEqual(option, val, groupValueKey) ||
        (option.options &&
          option.options.length &&
          option.options.some((opt) => isValueEqual(opt, val, valueKey)))
    )
  const isDisabled = option[optionDisabledKey]

  const onChange = (e) => {
    e.preventDefault()
  }
  const controlId = `group-${option[groupValueKey]}`

  return (
    <span>
      <label htmlFor={controlId}>
        <input
          id={controlId}
          checked={checked}
          disabled={isDisabled}
          onChange={onChange}
          type="checkbox"
        />
        {option[groupTitleKey]}
      </label>
    </span>
  )
}

OptionGroupRenderer.propTypes = {
  groupTitleKey: PropTypes.string.isRequired,
  groupValueKey: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  optionDisabledKey: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  valueKey: PropTypes.string.isRequired
}

OptionGroupRenderer.defaultProps = {
  optionDisabledKey: 'isDisabled'
}

export default OptionGroupRenderer
