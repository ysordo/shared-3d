import {
  usePlugin
} from "./chunk-76VOAIS3.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-5ZCTV7NA.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  dampingFactor,
  panSpeed,
  rotateSpeed,
  zoomSpeed,
  minDistance = 0.1,
  maxDistance = 1e3,
  minPolarAngle,
  maxPolarAngle,
  children
}) => {
  const config = useMemo(
    () => ({
      enablePan,
      enableRotate,
      enableZoom,
      dampingFactor,
      panSpeed,
      rotateSpeed,
      zoomSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle
    }),
    [
      enablePan,
      enableRotate,
      enableZoom,
      dampingFactor,
      panSpeed,
      rotateSpeed,
      zoomSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle
    ]
  );
  const [_enablePan, setEnablePan] = useState(enablePan);
  const [_enableRotate, setEnableRotate] = useState(enableRotate);
  const [_enableZoom, setEnableZoom] = useState(enableZoom);
  const [_minDistance, setMinDistance] = useState(minDistance);
  const [_maxDistance, setMaxDistance] = useState(maxDistance);
  const factory = useCallback(() => new AdvancedOrbitControlsPlugin(), []);
  const plugin = usePlugin(factory, config);
  useEffect(() => {
    if (plugin) {
      plugin.enablePan = _enablePan;
      plugin.enableRotate = _enableRotate;
      plugin.enableZoom = _enableZoom;
      plugin.minDistance = _minDistance;
      plugin.maxDistance = _maxDistance;
    }
  }, [
    plugin,
    _enablePan,
    _enableRotate,
    _enableZoom,
    _minDistance,
    _maxDistance
  ]);
  const state = useMemo(
    () => ({
      enablePan: _enablePan,
      enableRotate: _enableRotate,
      enableZoom: _enableZoom,
      minDistance: _minDistance,
      maxDistance: _maxDistance,
      setEnablePan: (value) => setEnablePan(value),
      setEnableRotate: (value) => setEnableRotate(value),
      setEnableZoom: (value) => setEnableZoom(value),
      setMinDistance: (value) => setMinDistance(value),
      setMaxDistance: (value) => setMaxDistance(value)
    }),
    [_enablePan, _enableRotate, _enableZoom, _minDistance, _maxDistance]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(state) });
};

export {
  AdvancedOrbitControls
};
