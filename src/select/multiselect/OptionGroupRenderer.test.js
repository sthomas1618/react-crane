import React from 'react'
import { mount, shallow } from 'enzyme'
import { getSelectValue } from '../utils'

import OptionGroupRenderer from './OptionGroupRenderer'

const groupedOptions = [
  {
    groupId: '1',
    title: 'Group 1',
    options: [
      {
        groupId: '1',
        id: '1',
        value: 'Option 1'
      },
      {
        groupId: '1',
        id: '2',
        value: 'Option 2'
      }
    ]
  },
  {
    groupId: '2',
    title: 'Group 2',
    options: [
      {
        groupId: '2',
        id: '3',
        value: 'Option 3'
      },
      {
        groupId: '2',
        id: '4',
        value: 'Option 4'
      }
    ]
  }
]

it('does not explode', () => {
  const renderer = (
    <OptionGroupRenderer
      option={{}}
      options={[]}
      groupTitleKey=""
      groupValueKey=""
      value=""
      valueKey="id"
      getSelectValue={() => {}}
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('renders group title correctly', () => {
  const component = mount(
    <OptionGroupRenderer
      option={groupedOptions[0]}
      options={groupedOptions}
      groupTitleKey="title"
      groupValueKey="groupId"
      value={[]}
      valueKey="id"
      getSelectValue={getSelectValue}
    />)

  expect(component.find('span')).toHaveText('Group 1')
})

it('renders group checkbox correctly', () => {
  const component = mount(
    <OptionGroupRenderer
      option={groupedOptions[0]}
      options={groupedOptions}
      groupTitleKey="title"
      groupValueKey="groupId"
      value={[groupedOptions[0]]}
      valueKey="id"
      getSelectValue={getSelectValue}
    />)

  expect(component.find('input').props().checked).toBe(true)
})
