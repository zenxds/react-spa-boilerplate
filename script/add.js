/**
 * 新增一个container
 */
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')

const util = require('./util')
const ask = require('./util/ask')

const templatePath = path.join(__dirname, '../template/container')
const containerPath = path.join(__dirname, '../src/container')
const storePath = path.join(__dirname, '../src/store/index.js')

const start = async() => {
  const container = await ask('请输入container名称:')
  // 可能是多级目录
  const containerName = path.basename(container)
  const dest = path.join(containerPath, container)

  if (!util.isSafeDir(dest)) {
    return Promise.reject('目标目录不为空')
  }

  // copy
  fse.copySync(templatePath, dest)

  // 替换container名称
  util.replace(path.join(dest, 'index.js'), {
    name: containerName
  })

  // 修改reducer
  updateStore({
    container,
    containerName
  })

  process.exit(0)
}

function updateStore({
  container,
  containerName
}) {
  const ast = util.getAstFromCode(fs.readFileSync(storePath, 'utf8'))
  const exportDefaultDeclarationIndex = ast.body.findIndex(item => {
    return item.type === 'ExportDefaultDeclaration'
  })
  const storeName = `${containerName}Store`

  // combine的参数
  ast.body[exportDefaultDeclarationIndex].declaration.properties.push({
    "type": "Property",
    "key": {
      "type": "Identifier",
      "name": storeName
    },
    "computed": false,
    "value": {
      "type": "Identifier",
      "name": storeName
    },
    "kind": "init",
    "method": false,
    "shorthand": true
  })

  // import语句
  ast.body.splice(exportDefaultDeclarationIndex, 0, {
    "type": "ImportDeclaration",
    "specifiers": [{
      "type": "ImportDefaultSpecifier",
      "local": {
        "type": "Identifier",
        "name": storeName
      }
    }],
    "source": {
      "type": "Literal",
      "value": `../container/${container}/store`,
      "raw": `'../container/${container}/store'`
    }
  })

  fs.writeFileSync(storePath, util.getCodeFromAst(ast).replace(/;/g, ''))
}

start().catch(e => {
  console.log(e)
  process.exit(1)
})
