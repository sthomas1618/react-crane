import React from 'react'
import { mount } from 'enzyme'

import SimpleSelect from './SimpleSelect'

it('does not explode', () => {
  const select = <SimpleSelect />
  const wrapper = mount(select)

  expect(wrapper).toExist()
})

it('should emit onOpen and onClosed events when props change', () => {
  const onOpen = jest.fn().mockName('onOpen')
  const onClose = jest.fn().mockName('onClose')

  const select = <SimpleSelect onOpen={onOpen} onClose={onClose} />
  const wrapper = mount(select)

  wrapper.setProps({ isOpen: true })

  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(onClose).not.toBeCalled()

  wrapper.setProps({ isOpen: false })

  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(onClose).toBeCalled()
})

it('should emit onOpen and onClose events when state changes', () => {
  const onOpen = jest.fn().mockName('onOpen')
  const onClose = jest.fn().mockName('onClose')

  const select = <SimpleSelect onOpen={onOpen} onClose={onClose} />
  const wrapper = mount(select)

  wrapper.setState({ isOpen: true })

  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(onClose).not.toBeCalled()

  wrapper.setState({ isOpen: false })

  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(onClose).toBeCalled()
})

it('should not show loading placeholder by default when open', () => {
  const select = <SimpleSelect isOpen />
  const wrapper = mount(select)

  expect(wrapper.find('.crane-select-loading-text')).not.toExist()
})

it('should show no results text when open', () => {
  const select = <SimpleSelect noResultsText="Foo" isOpen />
  const wrapper = mount(select)

  expect(wrapper.find('.crane-select-no-results')).toHaveText('Foo')
})

it('should show loading placeholder when isLoading and has loadingText', () => {
  const select = <SimpleSelect isLoading loadingText="Bar" isOpen />
  const wrapper = mount(select)

  expect(wrapper.find('.crane-select-loading-text')).toHaveText('Bar')
})
