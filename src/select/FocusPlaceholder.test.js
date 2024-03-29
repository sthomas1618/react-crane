import React from 'react'
import { mount } from 'enzyme'

import FocusPlaceholder from './FocusPlaceholder'

it('does not explode', () => {
  const focusPlaceholder = (
    <FocusPlaceholder
      ariaControls=""
      ariaExpanded=""
      id="foo"
      getRef={() => {}}
      onBlur={() => {}}
      onFocus={() => {}}
    />
  )
  const wrapper = mount(focusPlaceholder)

  expect(wrapper).toExist()
})
