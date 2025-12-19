import {
  usePlugin
} from "./chunk-X54D3YOP.js";
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
  const orchestrator = useScene();
  const data = useMemo(() => {
    return annotations.map((ann) => {
      if (!orchestrator) {
        return;
      }
      const target = typeof ann.target === "string" ? orchestrator.scene.getObjectByName(ann.target) : ann.target;
      return {
        id: ann.id,
        position: new THREE.Vector3(...ann.position),
        target,
        content: typeof ann.content === "string" ? ann.content : String(ann.content),
        offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0
      };
    });
  }, [annotations, orchestrator, orchestrator?.scene]);
  usePlugin(() => new AnnotationsPlugin(data), [data]);
  return null;
};

export {
  Annotations
};
