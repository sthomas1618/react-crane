import React from 'react'
import { shallow } from 'enzyme'

import MultiSelect from './MultiSelect'

it('does not explode', () => {
  const select = <MultiSelect />
  const wrapper = shallow(select)

  expect(wrapper).not.toBeEmpty()
})
