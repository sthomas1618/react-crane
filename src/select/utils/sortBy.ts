// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
// eslint-disable-next-line import/prefer-default-export
export default function sortBy(key: string) {
  // eslint-disable-next-line no-nested-ternary
  return (a: any, b: any) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)
}
