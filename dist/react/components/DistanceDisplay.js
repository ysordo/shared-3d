/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';
const unitConversions = {
    m: 1,
    cm: 100,
    mm: 1000,
    px: 3779.527559, // 1m ≈ 3779.53px (96 DPI)
    in: 39.3701,
    ft: 3.28084,
    km: 0.001,
};
const formatValue = (value, unit, decimals) => {
    const converted = value * unitConversions[unit];
    return `${converted.toFixed(decimals)}${unit}`;
};
export const DistanceDisplay = ({ children, className, unit = 'm', decimals = 2, }) => {
    const orchestrator = useScene();
    const animationRef = useRef(0);
    const [currentDistance, setCurrentDistance] = useState(0);
    const [initialDistance, setInitialDistance] = useState(null);
    const getCurrentDistance = () => {
        const model = orchestrator.getActiveModel();
        if (!model || !orchestrator.camera) {
            return 0;
        }
        const modelCenter = new THREE.Vector3();
        model.getWorldPosition(modelCenter);
        return orchestrator.camera.position.distanceTo(modelCenter);
    };
    useEffect(() => {
        const update = () => {
            const dist = getCurrentDistance();
            if (initialDistance === null && dist > 0) {
                setInitialDistance(dist);
            }
            setCurrentDistance(dist);
            animationRef.current = requestAnimationFrame(update);
        };
        animationRef.current = requestAnimationFrame(update);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [orchestrator, initialDistance]);
    if (initialDistance === null) {
        return _jsx("div", { className: className, children: "Calculating initial distance\u2026" });
    }
    const percentage = Math.max(0, Math.min(100, (currentDistance / initialDistance) * 100));
    const formatted = formatValue(currentDistance, unit, decimals);
    const formattedInitial = formatValue(initialDistance, unit, decimals);
    return (_jsx("div", { className: className, children: children({
            distance: currentDistance,
            formatted,
            percentage,
            initialDistance,
            formattedInitial,
        }) }));
};
//# sourceMappingURL=DistanceDisplay.js.map