/*! 2018-09-06 12:58:25 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{39:function(t,e,n){"use strict";n.r(e),function(t){var o,r=n(0),i=n(2),u=n(5);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function p(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=Object(u.inject)("homeStore","homeActions")(o=Object(i.withRouter)(o=Object(u.observer)(o=function(e){function n(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),p(this,s(n).apply(this,arguments))}var o,i,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(n,r["Component"]),o=n,(i=[{key:"componentDidMount",value:function(){this.props.homeActions.getMsg()}},{key:"render",value:function(){return t.createElement("div",null,this.props.homeStore.msg)}}])&&f(o.prototype,i),u&&f(o,u),n}())||o)||o)||o;e.default=l}.call(this,n(0))}}]);