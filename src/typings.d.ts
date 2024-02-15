declare interface Window {
  API_SERVER: string
  PUBLIC_PATH: string

  user: string
}

declare namespace JSX {
  interface CSSModuleClassName {
    styleName?: string
  }
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > &
      CSSModuleClassName
    a: React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > &
      CSSModuleClassName
  }
}
declare module '@loadable/component' {
  const content: any
  export = content
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
