import React from 'react'
import { mount } from 'enzyme'

import Menu from './Menu'

const testProps = {
  getOptionLabel: () => {},
  menuRef: () => {},
  onOptionClick: () => {},
  onOptionFocus: () => {},
  optionRef: () => {}
}

it('does not explode', () => {
  const menu = <Menu {...testProps} />
  const wrapper = mount(menu)

  expect(wrapper).toExist()
})
