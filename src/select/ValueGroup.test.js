import React from 'react'
import { shallow } from 'enzyme'

import ValueGroup from './ValueGroup'

it('does not explode', () => {
  const group = <ValueGroup />
  const wrapper = shallow(group)

  expect(wrapper).not.toBeEmpty()
})
