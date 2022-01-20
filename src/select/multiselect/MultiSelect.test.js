import React from 'react'
import { mount } from 'enzyme'

import MultiSelect from './MultiSelect'

it('does not explode', () => {
  const select = <MultiSelect />
  const wrapper = mount(select)

  expect(wrapper).toExist()
})
