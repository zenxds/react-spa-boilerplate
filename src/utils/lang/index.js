/**
 * 语言相关函数
 */

export const startsWith = (str, prefix) => {
  return str.lastIndexOf(prefix, 0) === 0
}

/**
 * array to map by a key attribute
 */
export function keyBy(array, key) {
  return array.reduce(function(map, obj) {
    let k = typeof key === 'function' ? key(obj) : obj[key]
    map[k] = obj
    return map
  }, {})
}

export * from './isPlainObject'
export * from './param'
