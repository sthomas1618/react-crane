import React from 'react'
import { shallow } from 'enzyme'

import OptionRenderer from './OptionRenderer'

it('does not explode', () => {
  const renderer = (
    <OptionRenderer
      getOptionLabel={() => {}}
      option={{}}
      value={{}}
      valueKey=""
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('renders title correctly', () => {
  const component = shallow(<OptionRenderer
    getOptionLabel={() => ('Foo')}
    option={{ id: 1 }}
    value={[]}
    valueKey="id"
  />)

  expect(component.find('span')).toHaveText('Foo')
})

it('toggles checkbox if selected', () => {
  const component = shallow(<OptionRenderer
    getOptionLabel={() => {}}
    option={{ id: 1 }}
    selected
    value={[{ id: 1 }]}
    valueKey="id"
  />)

  expect(component.find('input').props().checked).toBeTruthy()
})

it('toggles does not checkbox if not selected', () => {
  const component = shallow(<OptionRenderer
    option={{ id: 1 }}
    value={[{ id: 2 }]}
    valueKey="id"
    getOptionLabel={() => {}}
  />)

  expect(component.find('input').props().checked).toBeFalsy()
})

it('does not render checkboxes on hideCheckboxes', () => {
  const component = shallow(<OptionRenderer
    hideCheckboxes
    option={{ id: 1 }}
    valueKey="id"
    getOptionLabel={() => { }}
  />)

  expect(component.find('input')).toHaveLength(0)
})
