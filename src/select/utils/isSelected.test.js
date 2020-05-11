import isSelected from './isSelected'

const option1 = { id: '1', label: 'Option 1' }
const option2 = { id: '2', label: 'Option 2' }

const values = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5' }
]

it('should return false if value is null', () => {
  const result = isSelected(null, null, null)

  expect(result).toBeFalsy()
})

it('should return true if string value matches option', () => {
  const result = isSelected(option1, '1', 'id')

  expect(result).toBeTruthy()
})

it('should return false if string value does not match option', () => {
  const result = isSelected(option1, '2', 'id')

  expect(result).toBeFalsy()
})

it('should return true if object value matches option', () => {
  const result = isSelected(option1, option1, 'id')

  expect(result).toBeTruthy()
})

it('should return false if object value does not match option', () => {
  const result = isSelected(option1, option2, 'id')

  expect(result).toBeFalsy()
})

it('should return true if object is in list of values', () => {
  const result = isSelected(option1, values, 'id')

  expect(result).toBeTruthy()
})

it('should return false if object is not in list of values', () => {
  const option = { id: '7', label: 'Option 7' }
  const result = isSelected(option, values, 'id')

  expect(result).toBeFalsy()
})
