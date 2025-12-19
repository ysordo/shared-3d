import {
  usePlugin
} from "./chunk-HSIROGI3.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";

// src/react/components/Hotspots.tsx
import { useMemo } from "react";
import * as THREE from "three";
var Hotspots = ({ hotspots }) => {
  const deps = useMemo(() => [hotspots], [hotspots]);
  usePlugin(
    new HotspotPlugin(
      hotspots.map((hotspot) => ({
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position)
      }))
    ),
    deps
  );
  return null;
};

export {
  Hotspots
};
