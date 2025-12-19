import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AnnotationsPlugin
} from "./chunk-CPKJTF7R.js";
import {
  useScene
} from "./chunk-DWHU2W2T.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Annotations.tsx
import { useCallback } from "react";
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
    [annotations, scene]
  );
  usePlugin(factory, [annotations]);
  return null;
};

export {
  Annotations
};
