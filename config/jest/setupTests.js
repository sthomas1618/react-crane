import 'jest-enzyme'

import Enzyme from 'enzyme' // eslint-disable-line
import Adapter from 'enzyme-adapter-react-15' // eslint-disable-line

Enzyme.configure({ adapter: new Adapter() })

// https://github.com/facebook/jest/issues/2090
// force Prop warnings to fail tests
// eslint-disable-next-line no-console
console.error = (message) => {
  throw new Error(message)
}
