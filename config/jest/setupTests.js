import 'jest-enzyme'

import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

// https://github.com/facebook/jest/issues/2090
// force Prop warnings to fail tests
// eslint-disable-next-line no-console
console.error = (message) => {
  throw new Error(message)
}
