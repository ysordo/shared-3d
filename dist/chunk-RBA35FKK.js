import {
  GLTFLoader
} from "./chunk-JWY4ZHHB.js";

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
