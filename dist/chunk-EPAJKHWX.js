import {
  usePlugin
} from "./chunk-BKBNIEFK.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspot.tsx
import { useMemo } from "react";
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const deps = useMemo(
    () => [id, position, target, onClick],
    [id, position, target, onClick]
  );
  usePlugin(new HotspotPlugin([
    {
      id,
      position: new THREE.Vector3(...position),
      target,
      onClick
    }
  ]), deps);
  return null;
};

export {
  Hotspot
};
