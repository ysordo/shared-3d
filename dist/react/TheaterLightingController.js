'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
/**
 * Component to control lighting settings in a 3D scene.
 * Allows users to adjust intensity, number of lights, radius, height, and visibility of helpers.
 * @param {LightingControllerProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Rendered component with controls for lighting
 */
export function LightingController({ className, }) {
    const [intensity, setIntensity] = useState(1.0);
    const [lightCount, setLightCount] = useState(8);
    const [radiusFactor, setRadiusFactor] = useState(1.8);
    const [height, setHeight] = useState(2.5);
    const [showHelpers, setShowHelpers] = useState(true);
    return (_jsxs("div", { className: `bg-black bg-opacity-70 p-4 rounded-lg ${className || ''}`, children: [_jsx("h3", { className: "text-white text-lg font-bold mb-3", children: "Control de Iluminaci\u00F3n" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "text-white block mb-1", children: ["Intensidad: ", intensity.toFixed(1)] }), _jsx("input", { type: "range", min: "0.1", max: "3.0", step: "0.1", value: intensity, onChange: (e) => setIntensity(parseFloat(e.target.value)), className: "w-full" })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-white block mb-1", children: ["N\u00FAmero de luces: ", lightCount] }), _jsx("input", { type: "range", min: "4", max: "16", step: "1", value: lightCount, onChange: (e) => setLightCount(parseInt(e.target.value)), className: "w-full" })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-white block mb-1", children: ["Radio: ", radiusFactor.toFixed(1)] }), _jsx("input", { type: "range", min: "1.0", max: "3.0", step: "0.1", value: radiusFactor, onChange: (e) => setRadiusFactor(parseFloat(e.target.value)), className: "w-full" })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-white block mb-1", children: ["Altura: ", height.toFixed(1)] }), _jsx("input", { type: "range", min: "0.5", max: "5.0", step: "0.1", value: height, onChange: (e) => setHeight(parseFloat(e.target.value)), className: "w-full" })] }), _jsx("div", { children: _jsxs("label", { className: "text-white flex items-center", children: [_jsx("input", { type: "checkbox", checked: showHelpers, onChange: (e) => setShowHelpers(e.target.checked), className: "mr-2" }), "Mostrar Helpers"] }) })] })] }));
}
//# sourceMappingURL=TheaterLightingController.js.map