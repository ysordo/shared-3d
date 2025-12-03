// src/react/components/ErrorBoundary3D.tsx
import { Component } from "react";
import { jsx } from "react/jsx-runtime";
var ErrorBoundary3D = class extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error 3D capturado:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || /* @__PURE__ */ jsx("div", { className: "text-red-500", children: "Error al cargar modelo 3D" });
    }
    return this.props.children;
  }
};

export {
  ErrorBoundary3D
};
