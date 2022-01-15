import filterOptions from './filterOptions'

const getOptionLabel = ({ option }) => option.label

it('should return all when inputValue is null', () => {
  const inputValue = null
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual(options)
})

it('should return all when inputValue is empty', () => {
  const inputValue = ''
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual(options)
})

it('should return empty array when nothing matches', () => {
  const inputValue = 'no match'
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual([])
})

it('should match partial', () => {
  const inputValue = 'foo'
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual([
    {
      label: 'foobar'
    },
    {
      label: 'foo'
    }
  ])
})

it('should match exact', () => {
  const inputValue = 'foobar'
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual([
    {
      label: 'foobar'
    }
  ])
})

it('should match case-insenstive when ignoreCase is true', () => {
  const inputValue = 'foo'
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'Foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual([
    {
      label: 'foobar'
    },
    {
      label: 'Foo'
    }
  ])
})

it('should match case-senstive when ignoreCase is false', () => {
  const inputValue = 'foo'
  const options = [
    {
      label: 'foobar'
    },
    {
      label: 'Foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: false
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual([
    {
      label: 'foobar'
    }
  ])
})

it('should ignore allOption when matching', () => {
  const inputValue = 'select'
  const allOption = {
    label: 'Select All',
    value: 'SELECT_ALL'
  }
  const options = [
    allOption,
    {
      label: 'foobar'
    },
    {
      label: 'select Foo'
    },
    {
      label: 'bar'
    }
  ]
  const props = {
    allOption,
    allowSelectAll: true,
    getOptionLabel,
    ignoreCase: false,
    valueKey: 'value'
  }
  const newOptions = filterOptions(options, inputValue, props)

  expect(newOptions).toEqual([
    {
      label: 'select Foo'
    }
  ])
})

it('should match grouped options', () => {
  const inputValue = 'an'
  const options = [
    {
      label: 'California',
      options: [
        {
          label: 'Los Angelos'
        },
        {
          label: 'San Francisco'
        },
        {
          label: 'Santa Rosa'
        }
      ]
    },
    {
      label: 'Oregon',
      options: [
        {
          label: 'Eugene'
        },
        {
          label: 'Portland'
        },
        {
          label: 'Salem'
        }
      ]
    },
    {
      label: 'Washington',
      options: [
        {
          label: 'Redmond'
        },
        {
          label: 'Seattle'
        }
      ]
    }
  ]
  const props = {
    getOptionLabel,
    ignoreCase: true
  }
  const newOptions = filterOptions(options, inputValue, props)

  const expectation = [
    {
      label: 'California',
      options: [
        {
          label: 'Los Angelos'
        },
        {
          label: 'San Francisco'
        },
        {
          label: 'Santa Rosa'
        }
      ]
    },
    {
      label: 'Oregon',
      options: [
        {
          label: 'Portland'
        }
      ]
    }
  ]

  expect(newOptions).toEqual(expectation)
})
