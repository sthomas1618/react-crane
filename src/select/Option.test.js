import React from 'react'
import { mount } from 'enzyme'

import Option from './Option'

it('does not explode', () => {
  const option = (
    <Option
      option={{}}
      onOptionClick={() => {}}
      onOptionFocus={() => {}}
      optionRef={() => {}}
      getOptionLabel={() => {}}
    />
  )
  const wrapper = mount(option)

  expect(wrapper).toExist()
})
