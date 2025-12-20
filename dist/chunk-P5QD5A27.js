import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  HotspotPlugin
} from "./chunk-FR7NLAXH.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspots.tsx
import { useCallback, useEffect } from "react";
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
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update(
      hotspots.map((hotspot) => ({
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position)
      }))
    );
  }, [hotspots, plugin]);
  return null;
};

export {
  Hotspots
};
