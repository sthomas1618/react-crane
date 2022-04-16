import { GetOptionLabelParameters } from '../typeDefs'
import getLabel from './getLabel'

function getOptionLabel<T>({ option, labelKey, selected }: GetOptionLabelParameters) {
  return getLabel(option, labelKey, selected)
}

export default getOptionLabel
