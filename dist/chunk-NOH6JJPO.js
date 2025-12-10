import {
  useScene
} from "./chunk-R5F2MB42.js";

// src/react/components/HDRI.tsx
import { useEffect } from "react";
var HDRI = ({ entry }) => {
  const orchestrator = useScene();
  useEffect(() => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};

export {
  HDRI
};
