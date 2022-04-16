import { Option } from '../typeDefs'

function flattenOptions(
  options: Option[],
  allowSelectAll: boolean,
  allOption: Option | null | undefined
) {
  if (!options) {
    return []
  }

  let flatOptions: Option[] = []
  options.forEach((option) => {
    if (option.options && Array.isArray(option.options)) {
      flatOptions = flatOptions.concat(option.options)
    }
  })

  if (allOption && allowSelectAll && flatOptions && flatOptions.length > 0) {
    flatOptions.unshift(allOption)
  }

  return flatOptions && flatOptions.length > 0 ? flatOptions : options
}

export default flattenOptions
