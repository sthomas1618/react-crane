import React from 'react'
import { shallow } from 'enzyme'

import OptionGroupRenderer from './OptionGroupRenderer'

const groupedOptions = [
  {
    groupId: '1',
    title: 'Group 1',
    options: [
      { groupId: '1', id: '1', value: 'Option 1' },
      { groupId: '1', id: '2', value: 'Option 2' }
    ]
  },
  {
    groupId: '2',
    title: 'Group 2',
    options: [
      { groupId: '2', id: '3', value: 'Option 3' },
      { groupId: '2', id: '4', value: 'Option 4' }
    ]
  }
]

it('does not explode', () => {
  const renderer = (
    <OptionGroupRenderer
      option={{}}
      groupTitleKey=""
      groupValueKey=""
      value=""
      valueKey="id"
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('renders group title correctly', () => {
  const component = shallow(<OptionGroupRenderer
    option={groupedOptions[0]}
    groupTitleKey="title"
    groupValueKey="groupId"
    value={[]}
    valueKey="id"
  />)

  expect(component.find('span')).toHaveText('Group 1')
})

it('should toggle checkbox when item in group is selected', () => {
  const component = shallow(<OptionGroupRenderer
    option={groupedOptions[0]}
    groupTitleKey="title"
    groupValueKey="groupId"
    value={[{ groupId: '1' }]}
    valueKey="id"
  />)

  expect(component.find('input').props().checked).toBeTruthy()
})

it('should not toggle checkbox when item in group is not selected', () => {
  const component = shallow(<OptionGroupRenderer
    option={groupedOptions[0]}
    groupTitleKey="title"
    groupValueKey="groupId"
    value={[{ groupId: '2' }]}
    valueKey="id"
  />)

  expect(component.find('input').props().checked).toBeFalsy()
})

it('should toggle checkbox when item in flat values is selected', () => {
  const option = {
    groupId: 'A',
    groupTitle: 'Active Terms',
    options: [
      { groupId: 'A', id: 'U17', value: 'Summer 2017' },
      { groupId: 'A', id: 'S17', value: 'Spring 2017' },
      { groupId: 'A', id: 'F16', value: 'Fall 2016' }
    ]
  }

  const value = ['U17']

  const component = shallow(<OptionGroupRenderer
    option={option}
    groupTitleKey="title"
    groupValueKey="groupId"
    value={value}
    valueKey="id"
  />)

  expect(component.find('input').props().checked).toBeTruthy()
})
