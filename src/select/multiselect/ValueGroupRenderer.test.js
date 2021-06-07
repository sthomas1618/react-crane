import React from 'react'
import { shallow } from 'enzyme'

import ValueGroupRenderer from './ValueGroupRenderer'

const valueComponent = () => {}

it('does not explode', () => {
  const renderer = (
    <ValueGroupRenderer
      valueComponent={valueComponent}
      value={[]}
      valueKey=""
      labelKey=""
      options={[]}
      getSelectValue={() => {}}
      getLabel={() => {}}
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('displays custom customDelimiter', () => {
  const renderer = (
    <ValueGroupRenderer
      valueComponent={valueComponent}
      value={[]}
      valueKey=""
      customDelimiter=":::"
      labelKey=""
      options={['one', 'two']}
      getSelectValue={() => {}}
      getLabel={() => {}}
    />
  )
  const wrapper = shallow(renderer)

  console.log(wrapper)
})
