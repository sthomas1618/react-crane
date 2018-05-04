import React from 'react'
import { shallow } from 'enzyme'

import ValueGroup from './ValueGroup'

it('does not explode', () => {
  const group = <ValueGroup getLabel={() => {}} valueKey="" options={[]} />
  const wrapper = shallow(group)

  expect(wrapper).not.toBeEmpty()
})
