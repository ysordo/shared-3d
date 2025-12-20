import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AnnotationsPlugin
} from "./chunk-GK6FL434.js";
import {
  useScene
} from "./chunk-DWHU2W2T.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Annotations.tsx
import { useCallback, useEffect } from "react";
var Annotations = ({ annotations }) => {
  const { scene } = useScene();
  const factory = useCallback(
    () => new AnnotationsPlugin(
      annotations.map((ann) => {
        const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
        return {
          id: ann.id,
          position: new THREE.Vector3(...ann.position),
          target,
          content: typeof ann.content === "string" ? ann.content : String(ann.content),
          offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0
        };
      })
    ),
    []
  );
  const plugin = usePlugin(factory, [annotations]);
  useEffect(() => {
    plugin?.update(
      annotations.map((ann) => {
        const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
        return {
          id: ann.id,
          position: new THREE.Vector3(...ann.position),
          target,
          content: typeof ann.content === "string" ? ann.content : String(ann.content),
          offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0
        };
      })
    );
  }, [annotations, plugin]);
  return null;
};

export {
  Annotations
};
