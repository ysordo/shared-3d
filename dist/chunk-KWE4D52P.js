import {
  useScene
} from "./chunk-N2Q7PBDH.js";
import {
  AnnotationsPlugin
} from "./chunk-CPKJTF7R.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/Annotations.tsx
import React, { useEffect } from "react";
var Annotations = ({ annotations }) => {
  const orchestrator = useScene();
  useEffect(() => {
    const data = annotations.map((ann) => {
      const target = typeof ann.target === "string" ? orchestrator.scene.getObjectByName(ann.target) : ann.target;
      const content = typeof ann.content === "string" ? ann.content : React.isValidElement(ann.content) ? ann.content.props.children : String(ann.content);
      return {
        id: ann.id,
        position: new THREE.Vector3(...ann.position),
        target,
        content,
        offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0
      };
    });
    const plugin = new AnnotationsPlugin(data);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [annotations]);
  return null;
};

export {
  Annotations
};
