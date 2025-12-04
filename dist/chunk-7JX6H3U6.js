import {
  useScene
} from "./chunk-YXZQN2XJ.js";

// src/react/components/Model.tsx
import { useEffect, useState } from "react";
var Model = ({
  entry,
  draco = false,
  children
}) => {
  const orchestrator = useScene();
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const load = async () => {
      const gltf = await orchestrator.setModel(entry, { draco });
      setModel(gltf);
    };
    load();
  }, [entry.id, draco, orchestrator, entry]);
  if (!model) {
    return null;
  }
  return children?.(model);
};

export {
  Model
};
