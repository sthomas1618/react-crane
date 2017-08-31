import React from 'react'
import { shallow } from 'enzyme'

import SimpleSelect from './SimpleSelect'

it('does not explode', () => {
  const select = <SimpleSelect />
  const wrapper = shallow(select)

  expect(wrapper).not.toBeEmpty()
})
