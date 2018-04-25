import React from 'react'

import { SimpleSelect } from '../../src'

class SwapiAsyncSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      inputValue: '',
      options: []
    }
  }

  onChange = event => (this.setState({ value: event.value }))

  onInputChange = (event) => {
    this.setState({ inputValue: event.value })
    this.fetchOptions(event.value)
  }

  onOpen = () => {
    this.fetchOptions()
  }

  fetchOptions(search) {
    const searchQuery = search ? `?search=${search}` : ''
    const url = `https://swapi.co/api/people${searchQuery}`

    fetch(url)
      .then(results => results.json())
      .then((data) => {
        const people = data.results
        this.setState({ options: people })
      })
  }

  render() {
    const { options, value, inputValue } = this.state

    return (
      <SimpleSelect
        {...this.props}
        labelKey="name"
        valueKey="name"
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        onOpen={this.onOpen}
        value={value}
        inputValue={inputValue}
        options={options}
      />
    )
  }
}

export default SwapiAsyncSelect
