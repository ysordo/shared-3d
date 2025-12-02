'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';
export const LightingController = ({ className, }) => {
    const { scene } = useScene();
    const [intensity, setIntensity] = useState(1);
    const updateLights = (value) => {
        setIntensity(value);
        scene.traverse((obj) => {
            if (obj instanceof THREE.Light) {
                obj.intensity = value * (obj.userData.baseIntensity || 1);
            }
        });
    };
    React.useEffect(() => {
        scene.traverse((obj) => {
            if (obj instanceof THREE.Light) {
                obj.userData.baseIntensity = obj.intensity;
            }
        });
    }, [scene]);
    return (_jsxs("div", { className: `bg-black/80 text-white p-4 rounded-lg ${className || ''}`, children: [_jsx("h3", { className: "text-lg font-bold mb-3", children: "Iluminaci\u00F3n Global" }), _jsxs("label", { className: "block", children: [_jsxs("span", { className: "text-sm", children: ["Intensidad: ", intensity.toFixed(2)] }), _jsx("input", { type: "range", min: "0", max: "3", step: "0.01", value: intensity, onChange: (e) => updateLights(parseFloat(e.target.value)), className: "w-full mt-2" })] })] }));
};
//# sourceMappingURL=LightingController.js.map