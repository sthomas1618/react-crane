import React from 'react'

import { SimpleSelect, filterOptions } from '../../src'
import names from '../fixtures/largeData'

class LargeDataAsyncSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      inputValue: '',
      options: [],
      isLoading: false
    }
  }

  onChange = event => (this.setState({ value: event.value }))

  onInputChange = (event) => {
    this.setState({ inputValue: event.value, isLoading: true })
    this.fetchOptions(event.value)
  }

  onOpen = () => {
    this.setState({ isLoading: true })
    this.fetchOptions()
  }

  fetchOptions(search) {
    setTimeout(() => {
      const people = search ? names.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1) : names
      this.setState({ options: people, isLoading: false })
    }, 150)
  }

  render() {
    const { options, value, inputValue, isLoading } = this.state

    return (
      <SimpleSelect
        {...this.props}
        inputValue={inputValue}
        isLoading={isLoading}
        valueKey="id"
        labelKey="name"
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        onOpen={this.onOpen}
        options={options}
        value={value}
      />
    )
  }
}

export default LargeDataAsyncSelect
