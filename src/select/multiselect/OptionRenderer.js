import React from 'react'
import PropTypes from 'prop-types'

const OptionRenderer = ({
  getOptionLabel,
  hideCheckboxes,
  labelKey,
  option,
  optionDisabledKey,
  selected
}) => {
  const optionLabel = getOptionLabel({ option, labelKey, selected })
  const isDisabled = option[optionDisabledKey]

  if (hideCheckboxes) {
    return (
      <span aria-selected={selected} className={selected ? 'crane-option-selected' : 'crane-option'}>
        {optionLabel}
      </span>
    )
  }

  const onChange = (e) => { e.preventDefault() }
  return (
    <span aria-selected={selected}>
      <label htmlFor={optionLabel} aria-disabled={isDisabled}>
        <input type="checkbox" checked={selected} disabled={isDisabled} onChange={onChange} />
        {optionLabel}
      </label>
    </span>
  )
}

OptionRenderer.propTypes = {
  getOptionLabel: PropTypes.func.isRequired,
  hideCheckboxes: PropTypes.bool,
  labelKey: PropTypes.string,
  option: PropTypes.object.isRequired,
  optionDisabledKey: PropTypes.string,
  selected: PropTypes.bool
}

OptionRenderer.defaultProps = {
  hideCheckboxes: false,
  labelKey: '',
  optionDisabledKey: 'isDisabled',
  selected: false
}

export default OptionRenderer
