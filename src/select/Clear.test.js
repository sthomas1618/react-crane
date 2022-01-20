import React from 'react'
import { mount } from 'enzyme'

import Clear from './Clear'

it('does not explode', () => {
  const clear = <Clear onClearClick={() => {}} onClearTouchEnd={() => {}} />
  const wrapper = mount(clear)

  expect(wrapper).toExist()
})
