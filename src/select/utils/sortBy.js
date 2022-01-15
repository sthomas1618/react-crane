// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
// eslint-disable-next-line import/prefer-default-export
export default function sortBy(key) {
  // eslint-disable-next-line no-nested-ternary
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)
}
