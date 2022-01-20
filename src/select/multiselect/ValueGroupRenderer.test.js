import React from 'react'
import { mount } from 'enzyme'

import ValueGroupRenderer from './ValueGroupRenderer'
import { getLabel, getSelectValue } from '../utils'
import userNames from '../../../stories/fixtures/userNames'

const valueComponent = ({ option }) => option.id

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
  const wrapper = mount(renderer)

  expect(wrapper).toExist()
})

it('displays custom delimiter', () => {
  const renderer = (
    <ValueGroupRenderer
      valueComponent={valueComponent}
      value={[userNames[0].id, userNames[1].id]}
      valueKey="id"
      delimiter=":::"
      labelKey="id"
      options={userNames}
      getSelectValue={getSelectValue}
      getLabel={getLabel}
    />
  )
  const wrapper = mount(renderer)

  expect(wrapper).toHaveText('0NC7B66CWT:::VSHJDS9787')
})
