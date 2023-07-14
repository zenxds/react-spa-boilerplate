export function isEmail(s) {
  return /^[\w-.]+@([\w-]+\.)+[a-z]{2,}$/i.test(s)
}

export function isMobile(s) {
  return /^\d{11}$/i.test(s)
}

export function isSMSCode(s) {
  return /^\d{6}$/i.test(s)
}

export function isPassword(s) {
  return /^[\w-]{4,20}$/.test(s)
}

export function isUsername(s) {
  return /^[a-zA-Z]\w{4,20}$/.test(s)
}

export function isDisabled(form) {
  const errors = form.getFieldsError()
  const values = form.getFieldsValue()
  const keys = Object.keys(values)

  for (let i = 0; i < errors.length; i++) {
    if (errors[i].errors.length) {
      return true
    }
  }

  for (let i = 0; i < keys.length; i++) {
    if (!values[keys[i]]) {
      return true
    }
  }

  return false
}
