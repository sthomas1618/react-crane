// Adapted from https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/accessibility/index.js

import { A11yContext } from '../typeDefs'

export function instructionsAriaMessage(event: string, context: A11yContext | null) {
  if (!context) {
    return null
  }

  const { isSearchable, focusedOption = {}, label, labelKey = 'label', options = [] } = context

  switch (event) {
    case 'menu':
      return 'Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu.'
    case 'input':
      return `${label || 'Select'} is focused${
        isSearchable ? ', type to refine list' : ''
      }, press Down to open the menu`
    case 'focus':
      return `${focusedOption[labelKey]} is now currently focused. Option ${
        options.indexOf(focusedOption) + 1
      } of ${options.length}.`
    default:
      return null
  }
}

export function valueEventAriaMessage<T>(event: string, context: A11yContext | null) {
  if (!context) {
    return null
  }

  const { value } = context

  if (!value) return null

  if (event === 'deselect-option') {
    return `option ${value}, deselected.`
  }
  if (event === 'select-option') {
    return `option ${value}, selected.`
  }

  return null
}

export const resultsAriaMessage = (inputValue: string, screenReaderMessage: string) => {
  const searchTerm = inputValue && inputValue !== '' ? ` for search term ${inputValue}` : ''
  return `${screenReaderMessage}${searchTerm}.`
}
