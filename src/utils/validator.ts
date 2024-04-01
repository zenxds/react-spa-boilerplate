export function isEmail(s: string) {
  return /^[\w-.]+@([\w-]+\.)+[a-z]{2,}$/i.test(s)
}

export function isMobile(s: string) {
  return /^\d{11}$/i.test(s)
}

export function isSMSCode(s: string) {
  return /^\d{6}$/i.test(s)
}

export function isPassword(s: string) {
  return /^[\w-]{4,20}$/.test(s)
}

export function isUsername(s: string) {
  return /^[a-zA-Z]\w{4,20}$/.test(s)
}
