import React from 'react'
import PropTypes from 'prop-types'

import { MultiSelect } from '../../src'
import {
  filterOptions,
  flattenOptions,
  getLabel,
  getOptionLabel,
  getSelectValue
} from '../../src/select/utils'

class FilterMultiSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      value: []
    }
  }

  onChange = (event) => {
    const { onChange, valueKey } = this.props

    this.setState({ value: event.value.map((val) => val[valueKey]) })

    if (onChange) {
      onChange(event)
    }
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.value })
  }

  getSelectValue = (vals) => {
    const { value } = vals
    const { allOption, allowSelectAll, options, valueKey } = this.props
    const flatOpts = flattenOptions(options, allowSelectAll, allOption)
    const selectValueProps = {
      valueKey,
      value,
      options: flatOpts
    }
    return getSelectValue(selectValueProps)
  }

  isAllSelected = (values) => {
    const { allOption, allowSelectAll, options } = this.props
    const flatOpts = flattenOptions(options, allowSelectAll, allOption)
    return values.length === flatOpts.length - 1
  }

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      onInputChange,
      options,
      ...controlProps
    } = this.props
    const { inputValue, value } = this.state
    const opts = filterOptions(options, inputValue, this.props)

    return (
      <MultiSelect
        {...controlProps}
        inputValue={inputValue}
        options={opts}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        getSelectValue={this.getSelectValue}
        isAllSelected={this.isAllSelected}
        value={value}
        showInput
        ignoreCase
      />
    )
  }
}

FilterMultiSelect.propTypes = {
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.object,
  getLabel: PropTypes.func,
  getOptionLabel: PropTypes.func,
  groupByKey: PropTypes.string,
  groupTitleKey: PropTypes.string,
  groupValueKey: PropTypes.string,
  labelKey: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.array,
  valueKey: PropTypes.string
}
FilterMultiSelect.defaultProps = {
  allowSelectAll: false,
  allOption: {
    value: 'Select All',
    id: '*'
  },
  getLabel,
  getOptionLabel,
  groupByKey: '',
  groupTitleKey: 'title',
  groupValueKey: 'groupId',
  labelKey: '',
  name: '',
  onChange: null,
  value: null,
  valueKey: 'value'
}

export default FilterMultiSelect
