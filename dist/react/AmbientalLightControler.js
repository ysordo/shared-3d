'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AmbientLight } from './AmbientLight';
/**
 * Component to control ambient light in a 3D scene.
 * Allows users to adjust intensity and color of the ambient light.
 * @param {AmbientLightControllerProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {number} [props.initialIntensity=0.5] - Initial intensity of the ambient light
 * @param {string} [props.initialColor='#ffffff'] - Initial color of the ambient light in hex format
 * @returns {JSX.Element} Rendered component with controls for ambient light
 */
export function AmbientLightController({ className, initialIntensity = 0.5, initialColor = '#ffffff', }) {
    const [intensity, setIntensity] = useState(initialIntensity);
    const [color, setColor] = useState(initialColor);
    return (_jsxs("div", { className: `bg-gray-900 bg-opacity-75 p-4 rounded-lg ${className || ''}`, children: [_jsx("h3", { className: "text-white text-lg font-bold mb-3", children: "Control de Luz Ambiental" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "text-white block mb-1", children: ["Intensidad: ", intensity.toFixed(2)] }), _jsx("input", { type: "range", min: "0", max: "2", step: "0.01", value: intensity, onChange: (e) => setIntensity(parseFloat(e.target.value)), className: "w-full" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white block mb-1", children: "Color:" }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "color", value: color, onChange: (e) => setColor(e.target.value), className: "h-10 w-10 cursor-pointer" }), _jsx("span", { className: "text-white ml-2", children: color })] })] })] }), _jsx(AmbientLight, { color: color, intensity: intensity })] }));
}
//# sourceMappingURL=AmbientalLightControler.js.map