import {
  usePlugin
} from "./chunk-QJQ7EYVU.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  useScene
} from "./chunk-HYGB3ZMQ.js";

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
    [...hotspots]
  );
  usePlugin(() => new HotspotPlugin(data), [...data]);
  return null;
};

export {
  Hotspots
};
