import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
import {
  AnnotationsPlugin
} from "./chunk-CPKJTF7R.js";
import {
  useScene
} from "./chunk-Z3ENXIV3.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Annotations.tsx
import { useMemo } from "react";
var Annotations = ({ annotations }) => {
  const { scene } = useScene();
  const data = useMemo(() => {
    return annotations.map((ann) => {
      const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
      return {
        id: ann.id,
        position: new THREE.Vector3(...ann.position),
        target,
        content: typeof ann.content === "string" ? ann.content : String(ann.content),
        offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0
      };
    });
  }, [annotations, scene]);
  usePlugin(
    "Annotations",
    () => new AnnotationsPlugin(data),
    data
  );
  return null;
};

export {
  Annotations
};
