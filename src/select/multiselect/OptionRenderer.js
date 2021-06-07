import React from 'react'
import PropTypes from 'prop-types'

const OptionRenderer = ({
  getOptionLabel,
  hideCheckboxes,
  labelKey,
  option,
  selected
}) => {
  const optionLabel = getOptionLabel({ option, labelKey, selected })

  if (hideCheckboxes) {
    return (
      <span aria-selected={selected}>
        {optionLabel}
      </span>
    )
  }

  const onChange = (e) => { e.preventDefault() }
  return (
    <span aria-selected={selected}>
      <label htmlFor={optionLabel}>
        <input type="checkbox" checked={selected} onChange={onChange} />
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
  selected: PropTypes.bool
}

OptionRenderer.defaultProps = {
  hideCheckboxes: false,
  labelKey: '',
  selected: false
}

export default OptionRenderer
