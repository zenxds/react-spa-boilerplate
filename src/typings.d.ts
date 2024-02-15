declare interface Window {
  API_SERVER: string
  PUBLIC_PATH: string

  user: string
}

declare module '@loadable/component' {
  const content: any
  export = content
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
