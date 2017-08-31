import React from 'react'
import { shallow } from 'enzyme'

import OptionRenderer from './OptionRenderer'

it('does not explode', () => {
  const renderer = <OptionRenderer option={{}} valueKey="" value={{}} labelKey="" />
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})
