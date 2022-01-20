import React from 'react'
import { mount } from 'enzyme'

import Loading from './Loading'

it('does not explode', () => {
  const renderer = <Loading isLoading />
  const wrapper = mount(renderer)

  expect(wrapper).toExist()
})

it('does not render anything is not loading', () => {
  const renderer = <Loading isLoading={false} />
  const wrapper = mount(renderer)

  expect(wrapper.html()).toBeNull()
})

it('does render loading when is loading', () => {
  const renderer = <Loading isLoading />
  const wrapper = mount(renderer)

  expect(wrapper.find('.crane-select-loading-container')).toExist()
})
