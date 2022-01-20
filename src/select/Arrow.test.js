import React from 'react'
import { mount } from 'enzyme'

import Arrow from './Arrow'

it('does not explode', () => {
  const arrow = <Arrow onArrowClick={() => {}} onArrowTouchEnd={() => {}} isOpen />
  const wrapper = mount(arrow)

  expect(wrapper).toExist()
})
