// 父元素如果有溢出隐藏之类的，需要额外再设置
export function getPopupContainer(triggerNode?: HTMLElement) {
  let element: HTMLElement | undefined = triggerNode

  if (!element) {
    return document.body
  }

  do {
    element = element.parentNode as HTMLElement

    if (
      hasClass(element, 'ant-modal-content') ||
      hasClass(element, 'app-content')
    ) {
      return element
    }
  } while (element)

  return document.body
}

function hasClass(element: HTMLElement, className: string) {
  if (!element || !element.classList) {
    return false
  }

  return element.classList.contains(className)
}
