import React from 'react'
import { shallow } from 'enzyme'

import SearchSelect from './SearchSelect'

it('does not explode', () => {
  const select = <SearchSelect inputValue="" onInputChange={() => {}} />
  const wrapper = shallow(select)

  expect(wrapper).not.toBeEmpty()
})
