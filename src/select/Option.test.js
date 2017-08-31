import React from 'react'
import { shallow } from 'enzyme'

import Option from './Option'

it('does not explode', () => {
  const option = <Option option={{}} onOptionClick={() => {}} />
  const wrapper = shallow(option)

  expect(wrapper).not.toBeEmpty()
})
