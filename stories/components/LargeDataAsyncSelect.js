import React from 'react'

import { SimpleSelect } from '../../src'
import names from '../fixtures/largeData'

const delay = (result) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(result())
    }, 250)
  })

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

  handleChange = (event) => this.setState({ value: event.value })

  handleInputChange = async (event) => {
    this.setState({ inputValue: event.value, isLoading: true })
    await this.fetchOptions(event.value)
  }

  handleOpen = async () => {
    this.setState({ isLoading: true })
    await this.fetchOptions()
  }

  async fetchOptions(search) {
    const people = await delay(() =>
      search
        ? names.filter((person) => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        : names
    )
    this.setState({ options: people, isLoading: false })
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
        showInput
        value={value}
        valueKey="id"
      />
    )
  }
}

export default LargeDataAsyncSelect
