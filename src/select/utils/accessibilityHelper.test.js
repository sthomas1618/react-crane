import {
  instructionsAriaMessage,
  valueEventAriaMessage,
  resultsAriaMessage
} from '.'

const options = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5' }
]

const instructionsContext = {
  isSearchable: true,
  focusedOption: options[1],
  label: 'Test',
  labelKey: 'label',
  options
}

it('should return valid menu instructionsAriaMessage', () => {
  const msg = instructionsAriaMessage('menu', instructionsContext)

  expect(msg).toEqual('Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu.')
})

it('should return valid input instructions when label is provided and field is searchable', () => {
  const msg = instructionsAriaMessage('input', instructionsContext)

  expect(msg).toEqual('Test is focused, type to refine list, press Down to open the menu')
})

it('should return valid input instructions when label is not provided and input field is not searchable', () => {
  const context = {
    isSearchable: false,
    focusedValue: null,
    label: null
  }

  const msg = instructionsAriaMessage('input', context)

  expect(msg).toEqual('Select is focused, press Down to open the menu')
})

it('should return valid instructions for focus event', () => {
  const msg = instructionsAriaMessage('focus', instructionsContext)

  expect(msg).toEqual('Option 2 is now currently focused. Option 2 of 5.')
})

const valueEventContext = {
  value: 'test'
}

it('should not return valueEventAriaMessage if the value is null', () => {
  const context = { value: null }
  const msg = valueEventAriaMessage(null, context)

  expect(msg).toBeNull()
})

it('should return correct select message', () => {
  const msg = valueEventAriaMessage('select-option', valueEventContext)

  expect(msg).toEqual('option test, selected.')
})

it('should return correct deselect message', () => {
  const msg = valueEventAriaMessage('deselect-option', valueEventContext)

  expect(msg).toEqual('option test, deselected.')
})

const screenReaderMessage = 'test screen reader message'

it('should not return search term if input value is not provided', () => {
  const msg = resultsAriaMessage(null, screenReaderMessage)

  expect(msg).toEqual(`${screenReaderMessage}.`)
})

it('should render search term when provided', () => {
  const msg = resultsAriaMessage('Test input', screenReaderMessage)

  expect(msg).toEqual(`${screenReaderMessage} for search term Test input.`)
})
