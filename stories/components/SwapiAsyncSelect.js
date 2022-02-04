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

  handleChange = (event) => this.setState({ value: event.value })

  handleInputChange = (event) => {
    this.setState({ inputValue: event.value, isLoading: true })
    this.fetchOptions(event.value)
  }

  handleOpen = () => {
    this.setState({ isLoading: true })
    this.fetchOptions()
  }

  fetchOptions(search) {
    const searchQuery = search ? `?search=${search}` : ''
    const url = `https://swapi.dev/api/people${searchQuery}`

    fetch(url)
      .then((results) => results.json())
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
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onOpen={this.handleOpen}
        options={options}
        value={value}
        valueKey="name"
      />
    )
  }
}

export default SwapiAsyncSelect
