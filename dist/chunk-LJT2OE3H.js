import {
  usePlugin
} from "./chunk-LRTR63O6.js";
import {
  useScene
} from "./chunk-AARDPV3F.js";
import {
  AnnotationsPlugin
} from "./chunk-JX3LRZFE.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Annotations.tsx
import { useCallback, useMemo } from "react";
var Annotations = ({ annotations }) => {
  const { scene } = useScene();
  const pluginData = useMemo(
    () => annotations.map((ann) => {
      const target = typeof ann.target === "string" ? scene.getObjectByName(ann.target) : ann.target;
      return {
        id: ann.id,
        position: new THREE.Vector3(...ann.position),
        target,
        content: typeof ann.content === "string" ? ann.content : String(ann.content),
        offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0,
        visible: true
        // siempre visible por defecto (puede extenderse en futuro)
      };
    }),
    [annotations, scene]
  );
  const factory = useCallback(() => new AnnotationsPlugin([]), []);
  usePlugin(factory, pluginData);
  return null;
};

export {
  Annotations
};
