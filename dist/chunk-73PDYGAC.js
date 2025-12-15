import {
  useScene
} from "./chunk-KHCQXOKB.js";
import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspot.tsx
import { useEffect } from "react";
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    const plugin = new HotspotPlugin([
      {
        id,
        position: new THREE.Vector3(...position),
        target,
        onClick
      }
    ]);
    orchestrator.use(plugin);
    return () => plugin.dispose();
  }, [id, position, target, onClick]);
  return null;
};

export {
  Hotspot
};
