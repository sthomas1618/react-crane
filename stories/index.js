import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number, text, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import {
  BasicSelect,
  BasicMultiSelect,
  BasicSearchSelect,
  BasicFilterSelect,
  FilterMultiSelect,
  SimpleSelectWithStringValue,
  MultiSelectWithStringValues,
  SwapiAsyncSelect,
  LargeDataAsyncSelect,
  CustomValueRenderer,
  GetUserNameLabel
} from './components'
import states from './fixtures/states'
import groupedTerms from './fixtures/groupedTerms'
import numbers from './fixtures/numbers'
import terms from './fixtures/terms'
import termTypes from './fixtures/termTypes'
import userNames from './fixtures/userNames'

import '../less/crane.less'

const stories = storiesOf('Select', module)

stories.addDecorator(withKnobs)

stories.add('with SimpleSelect', () => (
  <BasicSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
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
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
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

stories.add('with SimpleSelect and number value', () => (
  <SimpleSelectWithStringValue
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    isOpen={boolean('Is Open', false)}
    labelKey="label"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={numbers}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    valueKey="value"
  />
))

stories.add('with SimpleSelect and grouping', () => (
  <BasicSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    labelKey="value"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={groupedTerms}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    valueKey="id"
  />
))

stories.add('with SimpleSelect and Static Option', () => (
  <BasicSelect
    utoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    isLoading={boolean('Is Loading', false)}
    isOpen={boolean('Is Open', true)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    onStaticOptionClick={action('static option')}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    staticOption={object('Static Option', { name: 'Add New State', abbreviation: 'STATIC_ADD_NEW_STATE' })}
    valueKey="abbreviation"
  />
))
stories.add('with SimpleSelect and Two Static Options', () => (
  <BasicSelect
    utoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    isLoading={boolean('Is Loading', false)}
    isOpen={boolean('Is Open', true)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    onStaticOptionClick={action('static option')}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    staticOption={[object('Static Option', { name: 'Add New State', abbreviation: 'STATIC_ADD_NEW_STATE' }), object('Static Option', { name: 'Add Abbreviation', abbreviation: 'STATIC_ADD_ABBREVIATION' })]}
    valueKey="abbreviation"
  />
))

stories.add('with SimpleSelect and Static Option and empty options', () => (
  <BasicSelect
    utoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    isLoading={boolean('Is Loading', false)}
    isOpen={boolean('Is Open', true)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    onStaticOptionClick={action('static option')}
    options={[]}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    staticOption={{ name: 'Add New State', abbreviation: 'STATIC_ADD_NEW_STATE' }}
    valueKey="abbreviation"
  />
))

stories.add('with SimpleSelect and Two Static Option and empty options', () => (
  <BasicSelect
    utoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
    isLoading={boolean('Is Loading', false)}
    isOpen={boolean('Is Open', true)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    onStaticOptionClick={action('static option')}
    options={[]}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', false)}
    staticOption={[object('Static Option', { name: 'Add New State', abbreviation: 'STATIC_ADD_NEW_STATE' }), object('Static Option', { name: 'Add Abbreviation', abbreviation: 'STATIC_ADD_ABBREVIATION' })]}
    valueKey="abbreviation"
  />
))

stories.add('with MultiSelect', () => (
  <BasicMultiSelect
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="abbreviation"
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))

stories.add('with MultiSelect, hidden checkboxes, custom delimiter, and custom input', () => (
  <FilterMultiSelect
    autoCloseMenu={boolean('Auto Close Menu', false)}
    customDelimiter=":::"
    getOptionLabel={GetUserNameLabel}
    hideCheckboxes={boolean('Hide Checkboxes', true)}
    ignoreCase
    isOpen={boolean('Is Open', false)}
    labelKey="firstName"
    openOnClick={boolean('Open On Click', true)}
    options={userNames}
    placeholder={text('Placeholder', 'Select value...')}
    showValuesWhileFocused={boolean('Show Values while Focused', true)}
    valueKey="id"
    valueLabelLimit={number('Value Label Limit', 3)}
    showInput
  />
))

stories.add('with MultiSelect and string values', () => (
  <MultiSelectWithStringValues
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="abbreviation"
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))

stories.add('with MultiSelect, filtering, and select all option', () => (
  <FilterMultiSelect
    allowSelectAll={boolean('Allow Select All', true)}
    allSelectedText={text('All Selected Text', 'All Terms Selected')}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    ignoreCase
    isOpen={boolean('Is Open', false)}
    labelKey="value"
    openOnClick={boolean('Open On Click', true)}
    options={terms}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="id"
  />
))

stories.add('with MultiSelect and pre-formed grouping', () => (
  <BasicMultiSelect
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    labelKey="value"
    openOnClick={boolean('Open On Click', true)}
    options={groupedTerms}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="id"
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))

stories.add('with MultiSelect, filtering, calculated grouping, and select all', () => (
  <FilterMultiSelect
    allowSelectAll={boolean('Allow Select All', true)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    groupByKey="groupId"
    groups={termTypes}
    groupTitleKey="title"
    groupValueKey="groupId"
    ignoreCase
    isOpen={boolean('Is Open', false)}
    labelKey="value"
    openOnClick={boolean('Open On Click', true)}
    options={terms}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="id"
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))

stories.add('with MultiSelect and custom value renderer', () => (
  <div style={{ width: '600px' }} >
    <BasicMultiSelect
      allowSelectAll={boolean('Allow Select All', true)}
      autoCloseMenu={boolean('Auto Close Menu', false)}
      clearable={boolean('Clearable', false)}
      groupByKey="groupId"
      groupTitleKey="title"
      groupValueKey="groupId"
      isOpen={boolean('Is Open', false)}
      labelKey="value"
      openOnClick={boolean('Open On Click', true)}
      options={groupedTerms}
      placeholder={text('Placeholder', 'Select value...')}
      sort={boolean('Sort Options in Display', false)}
      valueGroupRenderer={CustomValueRenderer}
      valueKey="id"
    />
  </div>
))

stories.add('with MultiSelect, grouping, and select all option', () => (
  <BasicMultiSelect
    allowSelectAll={boolean('Select All Option', true)}
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    groupByKey="groupId"
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    labelKey="value"
    openOnClick={boolean('Open On Click', true)}
    options={groupedTerms}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="id"
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))

stories.add('with MultiSelect, filtering, and custom label renderer', () => (
  <FilterMultiSelect
    autoCloseMenu={boolean('Auto Close Menu', false)}
    clearable={boolean('Clearable', false)}
    getOptionLabel={GetUserNameLabel}
    ignoreCase
    isOpen={boolean('Is Open', false)}
    labelKey="firstName"
    openOnClick={boolean('Open On Click', true)}
    options={userNames}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="id"
    valueLabelLimit={number('Value Label Limit', 3)}
  />
))

stories.add('with SearchSelect', () => (
  <BasicSearchSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="abbreviation"
  />
))

stories.add('with FilterSelect', () => (
  <BasicFilterSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="abbreviation"
  />
))

stories.add('with FilterSelect and static option', () => (
  <BasicFilterSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    staticOption={object('Static Option', { name: 'Add New State', abbreviation: 'STATIC_ADD_NEW_STATE' })}
    valueKey="abbreviation"
  />
))

stories.add('with FilterSelect using grouped data', () => (
  <BasicFilterSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    groupTitleKey="title"
    groupValueKey="groupId"
    isOpen={boolean('Is Open', false)}
    labelKey="value"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={groupedTerms}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="id"
  />
))

stories.add('with Async Select using SWAPI', () => (
  <SwapiAsyncSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', false)}
    clearInputOnSelect={boolean('Clear Input on Select', false)}
    isOpen={boolean('Is Open', false)}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', true)}
  />
))

stories.add('with Async Select a whole lot of options', () => (
  <LargeDataAsyncSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', false)}
    clearInputOnSelect={boolean('Clear Input on Select', false)}
    isOpen={boolean('Is Open', false)}
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    placeholder={text('Placeholder', 'Select value...')}
    showInput={boolean('Show Input', true)}
  />
))

const Before = () => <span style={{ marginLeft: '8px' }}>$</span>

stories.add('with before component', () => (
  <BasicSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    beforeInput={<Before />}
    clearable={boolean('Clearable', false)}
    clearInputOnBlur={boolean('Clear Input on Blur', true)}
    clearInputOnSelect={boolean('Clear Input on Select', true)}
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

stories.add('with before component and placeholder', () => (
  <BasicFilterSelect
    autoCloseMenu={boolean('Auto Close Menu', true)}
    beforeInput={<Before />}
    clearable={boolean('Clearable', false)}
    isOpen={boolean('Is Open', false)}
    labelKey="name"
    openOnClick={boolean('Open On Click', true)}
    openOnEmptyInput={boolean('Open On Empty Input', true)}
    options={states}
    placeholder={text('Placeholder', 'Select value...')}
    valueKey="abbreviation"
  />
))
