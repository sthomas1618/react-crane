import React from 'react'
import { shallow } from 'enzyme'

import Value from './Value'

it('does not explode', () => {
  const value = <Value labelKey="" valueKey="" options={[]} />
  const wrapper = shallow(value)

  expect(wrapper).not.toBeEmpty()
})
