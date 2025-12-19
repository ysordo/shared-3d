import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspot.tsx
import { useCallback } from "react";
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const factory = useCallback(
    () => new HotspotPlugin([
      {
        id,
        position: new THREE.Vector3(...position),
        target,
        onClick
      }
    ]),
    [id, position, target, onClick]
  );
  usePlugin(factory, [id, position, target, onClick]);
  return null;
};

export {
  Hotspot
};
