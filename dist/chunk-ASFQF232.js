import {
  PostProcessingPlugin
} from "./chunk-SRDOYMT5.js";
import {
  useScene
} from "./chunk-EABNOBME.js";

// src/react/components/PostProcessing.tsx
import { useEffect } from "react";
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const orchestrator = useScene();
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const plugin = new PostProcessingPlugin(bloom);
    orchestrator.use(plugin);
    return () => {
    };
  }, [enabled, bloom.strength, bloom.radius, bloom.threshold]);
  return null;
};

export {
  PostProcessing
};
