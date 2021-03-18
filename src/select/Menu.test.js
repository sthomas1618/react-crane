import React from 'react'
import { shallow } from 'enzyme'

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
  const wrapper = shallow(menu)

  expect(wrapper).not.toBeEmpty()
})
