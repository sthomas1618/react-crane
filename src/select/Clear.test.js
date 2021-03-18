import React from 'react'
import { shallow } from 'enzyme'

import Clear from './Clear'

it('does not explode', () => {
  const clear = <Clear onClearClick={() => {}} onClearTouchEnd={() => {}} />
  const wrapper = shallow(clear)

  expect(wrapper).not.toBeEmpty()
})
