import {
  GLTFLoader
} from "./chunk-ELDOC6OD.js";

// src/react/components/ModelPreload.tsx
import { useEffect } from "react";
var ModelPreload = ({
  entries,
  draco = false
}) => {
  useEffect(() => {
    entries.forEach((entry) => {
      GLTFLoader.load(entry, { draco }).catch(() => {
      });
    });
  }, [entries, draco]);
  return null;
};

export {
  ModelPreload
};
