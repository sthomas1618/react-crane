import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'

import {
  BasicSelect,
  BasicMultiSelect,
  BasicSearchSelect,
  BasicFilterSelect,
  SimpleSelectWithStringValue,
  MultiSelectWithStringValues,
  CustomValueRenderer
} from './components'
import states from './fixtures/states'
import groupedTerms from './fixtures/groupedTerms'
import terms from './fixtures/terms'
import termTypes from './fixtures/termTypes'

import '../scss/crane.scss'

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
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
  />
))

stories.add('with SimpleSelect and string value', () => (
  <SimpleSelectWithStringValue
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    showInput={boolean('Show Input', false)}
    isOpen={boolean('Is Open', false)}
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
  />
))

stories.add('with SimpleSelect and grouping', () => (
  <BasicSelect
    options={groupedTerms}
    labelKey="value"
    valueKey="id"
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    showInput={boolean('Show Input', false)}
    isOpen={boolean('Is Open', false)}
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
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
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
  />
))

stories.add('with MultiSelect and string values', () => (
  <MultiSelectWithStringValues
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
  />
))

stories.add('with MultiSelect and select all option', () => (
  <BasicMultiSelect
    options={terms}
    labelKey="value"
    valueKey="id"
    isOpen={boolean('Is Open', false)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    allowSelectAll={boolean('Allow Select All', true)}
    allSelectedText={text('All Selected Text', 'All Terms Selected')}
  />
))

stories.add('with MultiSelect and pre-formed grouping', () => (
  <BasicMultiSelect
    options={groupedTerms}
    labelKey="value"
    valueKey="id"
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
  />
))

stories.add('with MultiSelect and calculated grouping and select all', () => (
  <BasicMultiSelect
    options={terms}
    labelKey="value"
    valueKey="id"
    groups={termTypes}
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    allowSelectAll={boolean('Allow Select All', true)}
  />
))

stories.add('with MultiSelect and custom value renderer', () => (
  <div style={{ width: '600px' }} >
    <BasicMultiSelect
      options={groupedTerms}
      labelKey="value"
      valueKey="id"
      groupByKey="groupId"
      groupTitleKey="title"
      groupValueKey="groupId"
      isOpen={boolean('Is Open', false)}
      autoCloseMenu={boolean('Auto Close Menu', false)}
      clearable={boolean('Clearable', false)}
      placeholder={text('Placeholder', 'Select value...')}
      openOnClick={boolean('Open On Click', true)}
      valueGroupRenderer={CustomValueRenderer}
      sort={boolean('Sort Options in Display', false)}
      allowSelectAll={boolean('Allow Select All', true)}
    />
  </div>
))

stories.add('with MultiSelect, grouping, and select all option', () => (
  <BasicMultiSelect
    options={groupedTerms}
    labelKey="value"
    valueKey="id"
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    allowSelectAll={boolean('Select All Option', true)}
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
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
  />
))

stories.add('with FilterSelect', () => (
  <BasicFilterSelect
    options={states}
    labelKey="name"
    valueKey="abbreviation"
    isOpen={boolean('Is Open', false)}
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
  />
))
