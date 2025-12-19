import {
  usePlugin
} from "./chunk-BDCH4C4X.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspots.tsx
import { useCallback } from "react";
var Hotspots = ({ hotspots }) => {
  const factory = useCallback(
    () => new HotspotPlugin(
      hotspots.map((hotspot) => ({
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position)
      }))
    ),
    [hotspots]
  );
  usePlugin(factory, [factory]);
  return null;
};

export {
  Hotspots
};
