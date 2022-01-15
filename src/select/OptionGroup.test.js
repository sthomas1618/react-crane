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

const testProps = {
  getOptionLabel: () => {},
  onOptionClick: () => {},
  onOptionFocus: () => {},
  option: {},
  optionRef: () => {}
}

it('does not explode', () => {
  const children = []
  const renderer = <OptionGroup {...testProps}>{children}</OptionGroup>
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('renders non-multiselect correctly', () => {
  const children = []
  const renderer = (
    <OptionGroup {...testProps} groupTitleKey="title" valueKey="id" option={groups[0]}>
      {children}
    </OptionGroup>
  )
  const component = mount(renderer)

  expect(component.find('span')).toHaveText('Group 1')
})

it('renders multiselect correctly', () => {
  const children = []
  const renderer = (
    <OptionGroup
      {...testProps}
      groupTitleKey="title"
      valueKey="id"
      optionGroupRenderer={OptionGroupRenderer}
      option={groups[0]}
    >
      {children}
    </OptionGroup>
  )
  const component = mount(renderer)

  expect(component.find('.crane-select-group-header')).toHaveText('Group 1')
})
