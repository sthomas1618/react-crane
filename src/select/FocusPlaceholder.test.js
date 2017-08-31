import React from 'react'
import { shallow } from 'enzyme'

import FocusPlaceholder from './FocusPlaceholder'

it('does not explode', () => {
  const focusPlaceholder = (
    <FocusPlaceholder
      ariaControls=""
      ariaExpanded=""
      getRef={() => {}}
      onBlur={() => {}}
      onFocus={() => {}}
    />
  )
  const wrapper = shallow(focusPlaceholder)

  expect(wrapper).not.toBeEmpty()
})
