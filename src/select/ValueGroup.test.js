import React from 'react'
import { mount } from 'enzyme'

import ValueGroup from './ValueGroup'

it('does not explode', () => {
  const group = <ValueGroup getLabel={() => {}} valueKey="" options={[]} isFocused={false} />
  const wrapper = mount(group)

  expect(wrapper).toExist()
})
