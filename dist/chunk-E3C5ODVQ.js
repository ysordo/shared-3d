import {
  usePlugin
} from "./chunk-NWZJDIYE.js";
import {
  HotspotPlugin
} from "./chunk-7L6JPLGD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspot.tsx
import { useCallback, useMemo } from "react";
var Hotspot = ({
  id,
  position,
  target,
  onClick,
  visible = true
}) => {
  const pluginData = useMemo(
    () => [
      {
        id,
        position: new THREE.Vector3(...position),
        target: target ?? void 0,
        onClick,
        visible
      }
    ],
    [id, position, target, onClick, visible]
  );
  const factory = useCallback(() => new HotspotPlugin([]), []);
  usePlugin(factory, pluginData);
  return null;
};

export {
  Hotspot
};
