import React from 'react'
import { shallow } from 'enzyme'

import ValueGroupRenderer from './ValueGroupRenderer'
import { getLabel, getSelectValue } from '../utils'
import userNames from '../../../stories/fixtures/userNames'

const valueComponent = () => {}

it('does not explode', () => {
  const renderer = (
    <ValueGroupRenderer
      valueComponent={valueComponent}
      value={[]}
      valueKey=""
      labelKey=""
      options={[]}
      getSelectValue={() => {}}
      getLabel={() => {}}
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).not.toBeEmpty()
})

it('displays custom customDelimiter', () => {
  const renderer = (
    <ValueGroupRenderer
      valueComponent={valueComponent}
      value={[userNames[0].id, userNames[1].id]}
      valueKey="id"
      customDelimiter=":::"
      labelKey="id"
      options={userNames}
      getSelectValue={getSelectValue}
      getLabel={getLabel}
    />
  )
  const wrapper = shallow(renderer)

  expect(wrapper).toHaveText('<valueComponent />:::<valueComponent />')
})
