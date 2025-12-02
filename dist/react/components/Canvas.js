'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { SceneProvider } from '../../context/SceneContext';
export const Canvas = forwardRef(({ config, children, ...canvasProps }, ref) => {
    return (_jsxs(SceneProvider, { ref: ref, config: config, children: [_jsx("canvas", { ref: ref, ...canvasProps }), children] }));
});
Canvas.displayName = 'Canvas';
//# sourceMappingURL=Canvas.js.map