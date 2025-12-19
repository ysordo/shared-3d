import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
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
  usePlugin(factory, [hotspots]);
  return null;
};

export {
  Hotspots
};
