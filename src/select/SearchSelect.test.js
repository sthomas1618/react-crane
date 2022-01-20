import React from 'react'
import { mount } from 'enzyme'

import SearchSelect from './SearchSelect'

it('does not explode', () => {
  const select = <SearchSelect inputValue="" onInputChange={() => {}} />
  const wrapper = mount(select)

  expect(wrapper).toExist()
})
