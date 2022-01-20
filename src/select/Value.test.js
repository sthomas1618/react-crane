import React from 'react'
import { mount } from 'enzyme'

import Value from './Value'

it('does not explode', () => {
  const value = <Value labelKey="" options={[]} getLabel={() => {}} />
  const wrapper = mount(value)

  expect(wrapper).toExist()
})
