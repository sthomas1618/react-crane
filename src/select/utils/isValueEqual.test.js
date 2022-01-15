import isValueEqual from './isValueEqual'

it('should match string value if equal', () => {
  const option = { id: '1' }

  const result = isValueEqual(option, '1', 'id')

  expect(result).toBeTruthy()
})

it('should not match string value if not equal', () => {
  const option = { id: '1' }

  const result = isValueEqual(option, '2', 'id')

  expect(result).toBeFalsy()
})

it('should match number value if equal', () => {
  const option = { id: 1 }

  const result = isValueEqual(option, 1, 'id')

  expect(result).toBeTruthy()
})

it('should not match number value if not equal', () => {
  const option = { id: 1 }

  const result = isValueEqual(option, 2, 'id')

  expect(result).toBeFalsy()
})

it('should match object value if equal', () => {
  const option = { id: '1' }

  const result = isValueEqual(option, { id: '1' }, 'id')

  expect(result).toBeTruthy()
})

it('should not match object value if not equal', () => {
  const option = { id: '1' }

  const result = isValueEqual(option, { id: '2' }, 'id')

  expect(result).toBeFalsy()
})

it('should match array value if equal', () => {
  const option = { id: '1' }

  const result = isValueEqual(option, ['1'], 'id')

  expect(result).toBeTruthy()
})

it('should not match array value if not equal', () => {
  const option = { id: '1' }

  const result = isValueEqual(option, ['2'], 'id')

  expect(result).toBeFalsy()
})
