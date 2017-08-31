import React from 'react'
import { shallow } from 'enzyme'

import Clear from './Arrow'

it('does not explode', () => {
  const clear = <Clear />
  const wrapper = shallow(clear)

  expect(wrapper).not.toBeEmpty()
})
