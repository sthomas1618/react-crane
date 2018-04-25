import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'

import {
  BasicSelect,
  BasicMultiSelect,
  BasicSearchSelect,
  BasicFilterSelect,
  FilterMultiSelect,
  SimpleSelectWithStringValue,
  MultiSelectWithStringValues,
  SwapiAsyncSelect,
  CustomValueRenderer,
  GetUserNameLabel
} from './components'
import states from './fixtures/states'
import groupedTerms from './fixtures/groupedTerms'
import terms from './fixtures/terms'
import termTypes from './fixtures/termTypes'
import userNames from './fixtures/userNames'

import '../scss/crane.scss'

const stories = storiesOf('Select', module)

stories.addDecorator(withKnobs)

stories.add('with SimpleSelect', () => (
  <BasicSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    clearable={boolean('Clearable', false)}
    isLoading={boolean('Is Loading', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    valueKey="abbreviation"
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

stories.add('with MultiSelect, filtering, and select all option', () => (
  <FilterMultiSelect
    options={terms}
    labelKey="value"
    valueKey="id"
    ignoreCase
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

stories.add('with MultiSelect, filtering, calculated grouping, and select all', () => (
  <FilterMultiSelect
    options={terms}
    labelKey="value"
    valueKey="id"
    groups={termTypes}
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    ignoreCase
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

stories.add('with MultiSelect, filtering, and custom label renderer', () => (
  <FilterMultiSelect
    options={userNames}
    valueKey="id"
    ignoreCase
    isOpen={boolean('Is Open', false)}
    valueLabelLimit={number('Value Label Limit', 3)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    placeholder={text('Placeholder', 'Select value...')}
    openOnClick={boolean('Open On Click', true)}
    getLabel={GetUserNameLabel}
    getOptionLabel={GetUserNameLabel}
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

stories.add('with Async Select using SWAPI', () => (
  <SwapiAsyncSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearInputOnBlur={boolean('Clear Input on Blur', false)}
    clearInputOnSelect={boolean('Clear Input on Select', false)}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', true)}
   />
))
