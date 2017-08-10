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
const reducerPath = path.join(__dirname, '../src/reducer/index.js')

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
  util.replace(path.join(dest, 'action/index.js'), {
    name: containerName
  })

  // 修改reducer
  updateReducer({
    container,
    containerName
  })

  process.exit(0)
}

function updateReducer({
  container,
  containerName
}) {
  const ast = util.getAstFromCode(fs.readFileSync(reducerPath, 'utf8'))
  const exportDefaultDeclarationIndex = ast.body.findIndex(item => {
    return item.type === 'ExportDefaultDeclaration'
  })

  // combine的参数
  ast.body[exportDefaultDeclarationIndex].declaration.arguments[0].properties.push({
    "type": "Property",
    "key": {
      "type": "Identifier",
      "name": containerName
    },
    "computed": false,
    "value": {
      "type": "Identifier",
      "name": containerName
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
        "name": containerName
      }
    }],
    "source": {
      "type": "Literal",
      "value": `../container/${container}/reducer`,
      "raw": `'../container/${container}/reducer'`
    }
  })

  fs.writeFileSync(reducerPath, util.getCodeFromAst(ast))
}

start().catch(e => {
  console.log(e)
  process.exit(1)
})