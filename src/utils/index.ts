export function isMobileDevice() {
  return (
    /iPhone|iPad|iPod|Android|mobile/i.test(navigator.userAgent) ||
    screen.width < 640
  )
}

export function getHashPath(href = window.location.href) {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const hashIndex = href.indexOf('#')
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1).split('?')[0]
}

export * from './getPublicPath'
export * from './getPopupContainer'
export * from './validator'
