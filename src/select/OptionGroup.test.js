import React from 'react'
import { mount, shallow } from 'enzyme'

import OptionGroup from './OptionGroup'
import OptionGroupRenderer from './multiselect/OptionGroupRenderer'

const groups = [
  {
    groupId: '1',
    title: 'Group 1'
  },
  {
    groupId: '2',
    title: 'Group 2'
  }
]

it('does not explode', () => {
  const renderer = (
    <OptionGroup
      groupTitleKey=""
      valueKey=""
      optionGroupRenderer={() => {}}
      option={{}}
      onOptionClick={() => {}}
      optionRef={() => {}}
    >
      children={[]}
    </OptionGroup>

  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('renders non-multiselect correctly', () => {
  const component = mount(
    <OptionGroup
      groupTitleKey="title"
      valueKey="id"
      optionGroupRenderer={null}
      option={groups[0]}
      onOptionClick={() => {}}
      optionRef={() => {}}
    >
      children={[]}
    </OptionGroup>
  )

  expect(component.find('span')).toHaveText('Group 1')
})

it('renders multiselect correctly', () => {
  const component = mount(
    <OptionGroup
      groupTitleKey="title"
      valueKey="id"
      optionGroupRenderer={OptionGroupRenderer}
      option={groups[0]}
      onOptionClick={() => {}}
      optionRef={() => {}}
    >
      children={[]}
    </OptionGroup>
  )

  expect(component.find('span .crane-select-group-header')).toHaveText('Group 1')
})
