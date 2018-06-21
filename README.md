# react-spa-boilerplate

## 目录规范

```
config
  webpack.config.${env}.js
  postcss.config.js
src
  component: 展示型组件
  container: 容器组件
    component: UI组件 or 业务组件
    constant: 常量定义
    action: action定义
    store: store配置
```

## polyfill

* babel-polyfill

## 其他

* react-css-modules 4.5.2到4.7.1 会导致一个antd tabs组件key的问题，先回退到4.5.0
