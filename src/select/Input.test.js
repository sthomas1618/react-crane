import React from 'react'
import { mount } from 'enzyme'

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
  const wrapper = mount(input)

  expect(wrapper).toExist()
})
