import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'

import { BasicSelect, BasicMultiSelect } from './components'
import states from './fixtures/states'

const stories = storiesOf('Select', module)

stories.addDecorator(withKnobs)

stories.add('with SimpleSelect', () => (
  <BasicSelect
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    showInput={boolean('Show Input', false)}
    isOpen={boolean('Is Open', false)}
  />
))

stories.add('with MultiSelect', () => (
  <BasicMultiSelect
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))
