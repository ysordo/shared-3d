import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  HotspotPlugin
} from "./chunk-FR7NLAXH.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Hotspot.tsx
import { useCallback, useEffect } from "react";
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const factory = useCallback(() => {
    if (!target) {
      return new HotspotPlugin([
        {
          id,
          position: new THREE.Vector3(...position),
          target: new THREE.Object3D(),
          onClick
        }
      ]);
    }
    return new HotspotPlugin([
      {
        id,
        position: new THREE.Vector3(...position),
        target,
        onClick
      }
    ]);
  }, [id, position, target, onClick]);
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    if (target) {
      plugin?.update([
        {
          id,
          position: new THREE.Vector3(...position),
          target,
          onClick
        }
      ]);
    }
  }, [id, position, target, onClick, plugin]);
  return null;
};

export {
  Hotspot
};
