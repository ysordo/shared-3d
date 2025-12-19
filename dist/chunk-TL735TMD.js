import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  useScene
} from "./chunk-Z3ENXIV3.js";

// src/react/components/Hotspots.tsx
import { useMemo } from "react";
import * as THREE from "three";
var Hotspots = ({ hotspots }) => {
  const orchestrator = useScene();
  const data = useMemo(
    () => hotspots.map((hotspot) => ({
      ...hotspot,
      position: new THREE.Vector3(...hotspot.position)
    })),
    [hotspots]
  );
  usePlugin("Hotspot", () => new HotspotPlugin(data), data);
  return null;
};

export {
  Hotspots
};
