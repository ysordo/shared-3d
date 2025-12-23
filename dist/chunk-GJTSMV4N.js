import {
  usePlugin
} from "./chunk-AIQHBGXB.js";
import {
  HotspotPlugin
} from "./chunk-7L6JPLGD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspots.tsx
import { useCallback, useMemo } from "react";
var Hotspots = ({ hotspots }) => {
  const pluginData = useMemo(
    () => hotspots.map((hotspot) => ({
      id: hotspot.id,
      position: new THREE.Vector3(...hotspot.position),
      target: hotspot.target ?? void 0,
      onClick: hotspot.onClick,
      visible: hotspot.visible ?? true
    })),
    [hotspots]
  );
  const factory = useCallback(() => new HotspotPlugin([]), []);
  usePlugin(factory, pluginData);
  return null;
};

export {
  Hotspots
};
