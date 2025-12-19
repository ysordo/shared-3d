import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
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
  usePlugin(factory, [factory]);
  return null;
};

export {
  Hotspot
};
