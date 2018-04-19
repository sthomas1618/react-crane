const GetUserNameLabel = (props) => {
  const { option } = props

  if (!option) {
    return null
  }

  return `${option.lastName}, ${option.firstName}`
}

export default GetUserNameLabel
