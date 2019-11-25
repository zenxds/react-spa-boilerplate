import { observable, computed } from 'mobx'

class Store {
  @observable menus = []

  @computed get pathMap() {
    const map = {}

    function walk(list) {
      list.forEach(item => {
        if (item.children) {
          walk(item.children)
        }

        map[item.path] = {
          path: item.path,
          name: item.name
        }
      })
    }

    walk(this.menus)
    return map
  }

  @computed get parentMap() {
    const map = {}

    function walk(list, parentCode) {
      list.forEach(item => {
        if (item.children) {
          walk(item.children, item.path)
        }

        if (parentCode) {
          map[item.path] = parentCode
        }
      })
    }

    walk(this.menus)
    return map
  }
}

export default new Store()
