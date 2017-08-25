import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import BasicSelect from './components/BasicSelect'
import states from './fixtures/states'

const stories = storiesOf('SimpleSelect', module)

stories.addDecorator(withKnobs)

stories.add('with basic settings', () => (
  <BasicSelect
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    showInput={boolean('Show Input', false)}
    isOpen={boolean('Is Open', false)}
  />
))
