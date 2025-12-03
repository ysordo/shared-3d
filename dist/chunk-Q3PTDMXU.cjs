"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;// src/react/components/ErrorBoundary3D.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var ErrorBoundary3D = (_class = class extends _react.Component {constructor(...args) { super(...args); _class.prototype.__init.call(this); }
  __init() {this.state = { hasError: false }}
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error 3D capturado:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "text-red-500", children: "Error al cargar modelo 3D" });
    }
    return this.props.children;
  }
}, _class);



exports.ErrorBoundary3D = ErrorBoundary3D;
