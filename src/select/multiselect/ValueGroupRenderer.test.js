import React from 'react'
import { shallow } from 'enzyme'

import ValueGroupRenderer from './ValueGroupRenderer'

const valueComponent = () => {}

it('does not explode', () => {
  const renderer = (
    <ValueGroupRenderer
      valueComponent={valueComponent}
      value={[]}
      labelKey=""
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})
