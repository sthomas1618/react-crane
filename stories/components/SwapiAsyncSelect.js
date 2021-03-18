import React from 'react'

import { SimpleSelect } from '../../src'

class SwapiAsyncSelect extends React.Component {
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
    const searchQuery = search ? `?search=${search}` : ''
    const url = `https://swapi.dev/api/people${searchQuery}`

    fetch(url)
      .then(results => results.json())
      .then((data) => {
        const people = data.results
        this.setState({ options: people, isLoading: false })
      })
  }

  render() {
    const { options, value, inputValue, isLoading } = this.state

    return (
      <SimpleSelect
        {...this.props}
        inputValue={inputValue}
        isLoading={isLoading}
        labelKey="name"
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        onOpen={this.onOpen}
        options={options}
        value={value}
        valueKey="name"
      />
    )
  }
}

export default SwapiAsyncSelect
