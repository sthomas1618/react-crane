import React from 'react'
import { shallow } from 'enzyme'

import OptionRenderer from './OptionRenderer'

it('does not explode', () => {
  const renderer = (
    <OptionRenderer
      option={{}}
      options={[]}
      valueKey=""
      value={{}}
      labelKey=""
      getSelectValue={() => {}}
      getOptionLabel={() => {}}
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})
