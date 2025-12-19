import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
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
  const data = useMemo(
    () => ({
      id,
      position: new THREE.Vector3(...position),
      target,
      onClick
    }),
    [id, position, target, onClick]
  );
  usePlugin("Hotspot", () => new HotspotPlugin([data]), [data]);
  return null;
};

export {
  Hotspot
};
