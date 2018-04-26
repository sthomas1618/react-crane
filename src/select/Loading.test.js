import React from 'react'
import { shallow } from 'enzyme'

import Loading from './Loading'

it('does not explode', () => {
  const renderer = <Loading isLoading />
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('does not render anything is not loading', () => {
  const renderer = <Loading isLoading={false} />
  const wrapper = shallow(renderer)

  expect(wrapper.html()).toBeNull()
})

it('does render loading when is loading', () => {
  const renderer = <Loading isLoading />
  const wrapper = shallow(renderer)

  expect(wrapper.find('.crane-select-loading-container')).not.toBeEmpty()
})
