/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
export class ErrorBoundary3D extends Component {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error 3D capturado:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (this.props.fallback || (_jsx("div", { className: "text-red-500", children: "Error al cargar modelo 3D" })));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary3D.js.map