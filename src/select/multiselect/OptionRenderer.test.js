import React from 'react'
import { shallow } from 'enzyme'

import OptionRenderer from './OptionRenderer'

it('does not explode', () => {
  const renderer = (
    <OptionRenderer
      option={{}}
      valueKey=""
      value={{}}
      getOptionLabel={() => {}}
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('renders title correctly', () => {
  const component = shallow(<OptionRenderer
    option={{ id: 1 }}
    value={[]}
    valueKey="id"
    getOptionLabel={() => ('Foo')}
  />)

  expect(component.find('span')).toHaveText('Foo')
})

it('toggles checkbox if selected', () => {
  const component = shallow(<OptionRenderer
    option={{ id: 1 }}
    value={[{ id: 1 }]}
    valueKey="id"
    getOptionLabel={() => {}}
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

it('toggles checkbox if selected with flat value', () => {
  const component = shallow(<OptionRenderer
    option={{ id: 1 }}
    value={[1]}
    valueKey="id"
    getOptionLabel={() => {}}
  />)

  expect(component.find('input').props().checked).toBeTruthy()
})
