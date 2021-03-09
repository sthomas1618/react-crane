import React from 'react'
import PropTypes from 'prop-types'

const OptionRenderer = ({
  getOptionLabel,
  option,
  labelKey,
  selected
}) => {
  const onChange = (e) => { e.preventDefault() }
  return (
    <span aria-selected={selected}>
      <label>
        <input type="checkbox" checked={selected} onChange={onChange} />
        {getOptionLabel({ option, labelKey, selected })}
      </label>
    </span>
  )
}

OptionRenderer.propTypes = {
  getOptionLabel: PropTypes.func.isRequired,
  labelKey: PropTypes.string,
  option: PropTypes.object.isRequired,
  selected: PropTypes.bool
}

OptionRenderer.defaultProps = {
  labelKey: '',
  selected: false
}

export default OptionRenderer
