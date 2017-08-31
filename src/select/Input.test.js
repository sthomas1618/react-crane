import React from 'react'
import { shallow } from 'enzyme'

import Input from './Input'

it('does not explode', () => {
  const input = (
    <Input
      ariaControls=""
      ariaExpanded=""
      getRef={() => {}}
      inputValue=""
      onChange={() => {}}
      onBlur={() => {}}
      onFocus={() => {}}
    />
  )
  const wrapper = shallow(input)

  expect(wrapper).not.toBeEmpty()
})
