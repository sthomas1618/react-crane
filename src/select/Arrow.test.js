import React from 'react'
import { shallow } from 'enzyme'

import Arrow from './Arrow'

it('does not explode', () => {
  const arrow = <Arrow />
  const wrapper = shallow(arrow)

  expect(wrapper).not.toBeEmpty()
})
