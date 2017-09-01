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
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})
