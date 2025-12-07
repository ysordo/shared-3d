import {
  HotspotPlugin
} from "./chunk-L3G2QMBD.js";
import {
  useScene
} from "./chunk-EABNOBME.js";

// src/react/components/Hotspots.tsx
import { useEffect } from "react";
import * as THREE from "three";
var Hotspots = ({ hotspots }) => {
  const orchestrator = useScene();
  useEffect(() => {
    const data = hotspots.map((h) => ({
      id: h.id,
      position: new THREE.Vector3(...h.position),
      target: typeof h.target === "string" ? orchestrator.scene.getObjectByName(h.target) : h.target,
      onClick: h.onClick,
      offset: h.offset ? new THREE.Vector3(...h.offset) : void 0
    }));
    const plugin = new HotspotPlugin(data);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [hotspots, orchestrator]);
  return null;
};

export {
  Hotspots
};
