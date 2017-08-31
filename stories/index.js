import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'

import { BasicSelect, BasicMultiSelect, BasicSearchSelect } from './components'
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
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    autoClearInput={boolean('Auto Clear Input', true)}
  />
))

stories.add('with MultiSelect', () => (
  <BasicMultiSelect
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
  />
))

stories.add('with SearchSelect', () => (
  <BasicSearchSelect
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    isOpen={boolean('Is Open', false)}
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
  />
))
