import { Option } from '../typeDefs'

function getLabel(option: Option, labelKey: string, _selected?: boolean) {
  return option ? (option[labelKey] as string) : null
}

export default getLabel
